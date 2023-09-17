export interface Recording {
  id: string;
  name: string;
  audioUrl: string;
  text: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
}

export type UserLogin = Omit<User, 'email'> | Omit<User, 'username'>;

export interface Token {
  access: string;
  refresh: string;
}
