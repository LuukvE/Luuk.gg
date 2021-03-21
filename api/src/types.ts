export type RequestBody = {
  [key: string]: string;
} | null;

export type Contributions = {
  [date: string]: number;
};

export type GithubContributionsBody = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
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
