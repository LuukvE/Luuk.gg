import { IncomingMessage, ServerResponse } from 'http';
import { getYear, format } from 'date-fns';
import fetch from 'node-fetch';

import { Contributions, GithubContributionsBody } from './types';

// Load data from the Github API from the start year till now
const startYear = parseInt(process.env.GITHUB_START_YEAR, 10);

// The Github API response is saved in here
const localCache: {
  contributions: Contributions;
  total: number;
} = { contributions: {}, total: 0 };

// Github only allows requesting data for a maximum of one year period
async function loadYear(year: number) {
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

// Send the contributions per day and total contributions to the client
export default async (request: IncomingMessage, response: ServerResponse) => {
  // If the current day is not found in the cache, request all data from the Github GraphQL API
  if (!localCache.contributions[format(new Date(), 'yyyy-MM-dd')]) {
    // Generate an array of years to load data for
    const years = new Array(getYear(new Date()) - startYear + 1)
      .fill(null)
      .map((_, index) => index + startYear);

    // Request the data from the API in parallel for each year
    const yearContributions = await Promise.all(years.map((year) => loadYear(year)));

    // Combine the transformed responses and update the local cache
    localCache.contributions = yearContributions.reduce(
      (contributions: Contributions, current) => ({
        ...contributions,
        ...current.contributions
      }),
      {}
    );

    // Add up the totals from each year into a single total
    localCache.total = yearContributions.reduce((total, current) => total + current.total, 0);
  }

  response.writeHead(200);

  response.end(JSON.stringify(localCache));
};
