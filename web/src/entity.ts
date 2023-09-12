export interface Recording {
  id: string;
  name: string;
  audioUrl: string;
  text: string;
}

export interface User {
  username: string;
  password: string;
}

export interface Token {
  access: string;
  refresh: string;
}
