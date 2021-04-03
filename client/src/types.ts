// Career page
export type Marker = {
  title: string;
  position: { lat: number; lng: number };
  content: string;
};

export type Contributions = {
  [date: string]: number;
};

// Messenger page
export type Message = {
  date: string;
  sender: string;
  text: string;
};

// Cooking page
export type Recipe = {
  cid: string;
  name: string;
  duration: string;
  creator: string;
  difficulty: number;
  image: string;
  text: string;
  created: string;
  deleted?: boolean;
};

export type AWSUploadResponse = {
  upload: { fields: { [key: string]: string }; url: string };
  link: string;
};

// Chess page
export type Piece = {
  name: string;
  row: string;
  column: string;
  color: string;
  taken?: boolean;
};

export type Square = null | {
  piece: Piece;
  index: number;
};

// Store state
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
    contributions: Contributions;
    totalContributions: number;
  };
  cooking: {
    openId: null | string;
    editId: null | string;
    deleteId: null | string;
    recipes: Recipe[];
  };
  chess: {
    fen: string;
    draw: boolean;
    rows: string[];
    pieces: Piece[];
    turn: 'w' | 'b';
    castling: string;
    rotated: boolean;
    columns: string[];
    squares: Square[];
    enPassant: string;
    latestMove: string;
    gameNumber: number;
    checkers: string[];
    legalMoves: string[];
    halfMoveClock: number;
    fullMoveNumber: number;
    dragging: null | Piece;
    requestPromotion: boolean;
    availableSquares: string[];
    userColor: 'w' | 'b' | 'none' | 'both';
  };
};
