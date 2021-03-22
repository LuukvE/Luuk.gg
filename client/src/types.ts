export type Marker = {
  title: string;
  position: { lat: number; lng: number };
  content: string;
};

export type State = {
  error: string;
  github: {
    contributions: {
      [date: string]: number;
    };
    total: number;
  };
};
