import { getYear, format } from 'date-fns';

import { Contributions } from '../types';

import { Github } from './schemas';
import loadYear from './loadYear';

const startYear = parseInt(process.env.GITHUB_START_YEAR, 10);

// GraphQL Query: github.get
export const resolveGet = async () => {
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
        totalContributions: yearContributions.reduce((total, current) => total + current.total, 0)
      },
      { upsert: true, new: true }
    );
  };