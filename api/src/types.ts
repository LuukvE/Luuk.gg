// AWS module
export type Recipe = {
  id: string;
  name: string;
  duration: string;
  creator: string;
  difficulty: number;
  image: string;
  text: string;
  created: string;
};

// Google module
export type Users = {
  [email: string]: {
    name: string;
    picture: string;
    email: string;
    id: string;
  };
};

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
