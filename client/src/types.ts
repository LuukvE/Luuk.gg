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

export type State = {
  error: string;
  slack: {
    online: boolean;
    messages: Message[];
  };
  github: {
    contributions: {
      [date: string]: number;
    };
    total: number;
  };
};
