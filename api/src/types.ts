import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { parseJSON } from 'date-fns';
import { Document } from 'mongoose';

export const GraphQLDate = new GraphQLScalarType({
  name: 'Date',
  serialize: (value: Date) => value.toJSON(),
  parseValue: (value: string) => parseJSON(value),
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) return null;

    return parseJSON(`${ast}`);
  }
});

export const GraphQLAny = new GraphQLScalarType({
  name: 'Any',
  serialize: (value) => value,
  parseValue: (value) => value,
  parseLiteral: (ast) => ast
});

// AWS module
export interface IRecipe extends Document {
  cid: string;
  name: string;
  duration: string;
  creator: string;
  difficulty: number;
  image: string;
  text: string;
  created: string;
}

// Google module
export interface IUser extends Document {
  email: string;
  name: string;
  created: Date;
  picture: string;
}

// Slack module
export type WebsocketMessage =
  | {
      sender: string;
      date: string;
      text: string;
    }
  | { online: boolean };

export type SlackMessage = {
  channel: string;
  text: string;
  mrkdwn: boolean;
  thread_ts?: string;
};

export type SlackEvent = {
  text: string;
  ts: string;
  thread_ts?: string;
  subtype?: string;
};

// Github module
export interface IGithub extends Document {
  contributions: { [key: string]: number };
  totalContributions: number;
}

export type Contributions = {
  [date: string]: number;
};

export type GithubContributionsBody = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              contributionCount: number;
              date: string;
            }[];
          }[];
        };
      };
    };
  };
};
