import { GraphQLFieldConfig, GraphQLObjectType, GraphQLInt, GraphQLID } from 'graphql';
import mongoose, { Schema } from 'mongoose';
import { getYear, format } from 'date-fns';
import fetch from 'node-fetch';

import { IGithub, Contributions, GithubContributionsBody } from '../types';

import Any from './scalars/any';

const startYear = parseInt(process.env.GITHUB_START_YEAR, 10);

const Github = mongoose.model<IGithub>(
  'github',
  new Schema({
    contributions: {},
    totalContributions: { type: Number, required: true }
  })
);

const githubFields = {
  _id: { type: GraphQLID },
  contributions: { type: Any },
  totalContributions: { type: GraphQLInt }
};

const GithubSchema = new GraphQLObjectType({
  name: 'github',
  fields: githubFields
});

export const githubQuery: GraphQLFieldConfig<any, any> = {
  resolve: (_, fields) => fields,
  type: new GraphQLObjectType({
    name: 'githubQuery',
    fields: {
      get: {
        type: GithubSchema,
        args: {},
        resolve: async () => {
          const github = await Github.findOne();

          // Found our saved Github API response
          if (github && github.contributions[format(new Date(), 'yyyy-MM-dd')]) {
            return github;
          }

          // Generate an array of years to load data for
          const years = new Array(getYear(new Date()) - startYear + 1)
            .fill(null)
            .map((_, index) => index + startYear);

          // Request the data from the API in parallel for each year
          const yearContributions = await Promise.all(years.map((year) => loadYear(year)));

          // Combine the transformed responses and update the local cache
          return Github.findOneAndUpdate(
            {},
            {
              contributions: yearContributions.reduce(
                (contributions: Contributions, current) => ({
                  ...contributions,
                  ...current.contributions
                }),
                {}
              ),
              totalContributions: yearContributions.reduce(
                (total, current) => total + current.total,
                0
              )
            },
            { upsert: true, new: true }
          );
        }
      }
    }
  })
};

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
