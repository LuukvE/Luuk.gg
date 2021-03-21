export type State = {
  error: string;
  github: {
    contributions: {
      [date: string]: number;
    };
    total: number;
  };
};
