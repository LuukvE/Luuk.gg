export type RequestBody = {
  [key: string]: string;
} | null;

export type Contributions = {
  [date: string]: number;
};

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
