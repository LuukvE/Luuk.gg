export type Marker = {
  title: string;
  position: { lat: number; lng: number };
  content: string;
};

export type Message = {
  date: string;
  sender: string;
  text: string;
};

export type Recipe = {
  name: string;
  duration: string;
  creator: string;
  difficulty: number;
  image: string;
  text: string;
};

export type State = {
  error: string;
  user: null | {
    name: string;
    email: string;
    picture?: string;
  };
  slack: {
    online: boolean;
    messages: Message[];
  };
  twilio: {
    token: string;
  };
  github: {
    contributions: {
      [date: string]: number;
    };
    total: number;
  };
  recipes: Recipe[];
};
