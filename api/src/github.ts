import { IncomingMessage, ServerResponse } from 'http';
import { getYear, format } from 'date-fns';
import fetch from 'node-fetch';

import { RequestBody, Contributions, GithubContributionsBody } from './types';

const localCache: {
  contributions: Contributions;
  total: number;
} = { contributions: {}, total: 0 };

async function loadYear(year: number) {
  const currentYear = getYear(new Date());
  const from = `${year}-01-01T00:00:00Z`;
  const to = year === currentYear ? new Date().toJSON() : `${year + 1}-01-01T00:00:00Z`;

  const github = await fetch('https://api.github.com/graphql', {
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

  if (github.status >= 300) {
    console.log(github.url, github.status, await github.text());

    return {};
  }

  const body: GithubContributionsBody = await github.json();

  const calendar = body.data.user.contributionsCollection.contributionCalendar;

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

export default async (request: IncomingMessage, response: ServerResponse, body: RequestBody) => {
  if (!localCache.contributions[format(new Date(), 'yyyy-MM-dd')]) {
    const years = new Array(getYear(new Date()) - 2010).fill(null).map((_, index) => index + 2011);
    const yearContributions = await Promise.all(years.map((year) => loadYear(year)));

    localCache.contributions = yearContributions.reduce(
      (contributions: Contributions, current) => ({
        ...contributions,
        ...current.contributions
      }),
      {}
    );

    localCache.total = yearContributions.reduce((total, current) => total + current.total, 0);
  }

  response.writeHead(200);

  response.end(JSON.stringify(localCache));
};
