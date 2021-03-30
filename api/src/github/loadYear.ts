import fetch from 'node-fetch';
import { getYear } from 'date-fns';

import { GithubContributionsBody } from '../types';

// Github only allows requesting data for a maximum of one year period
export default async function loadYear(year: number) {
    const currentYear = getYear(new Date());
    const from = `${year}-01-01T00:00:00Z`;
  
    // If we are loading data for this year, load until the current datetime
    const to = year === currentYear ? new Date().toJSON() : `${year + 1}-01-01T00:00:00Z`;
  
    // GraphQL request using the access token configured in Developer Settings on Github Settings page
    const githubRequest = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${process.env.GITHUB_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        query: `query {
          user(login: "${process.env.GITHUB_USERNAME}") {
            contributionsCollection(from: "${from}", to: "${to}") {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }`
      })
    });
  
    // If the request fails, log the response and return an empty dataset
    if (githubRequest.status >= 300) {
      console.log(githubRequest.url, githubRequest.status, await githubRequest.text());
  
      return { contributions: {}, total: 0 };
    }
  
    const body: GithubContributionsBody = await githubRequest.json();
  
    const calendar = body.data.user.contributionsCollection.contributionCalendar;
  
    // Transform the data from Github into a simplified object
    return {
      contributions: calendar.weeks.reduce(
        (contributions, week) =>
          week.contributionDays.reduce((contributions, day) => {
            contributions[day.date] = day.contributionCount;
  
            return contributions;
          }, contributions),
        {}
      ),
      total: calendar.totalContributions
    };
  }