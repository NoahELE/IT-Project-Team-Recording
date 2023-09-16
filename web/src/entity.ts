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

export type UserSignIn = Omit<User, 'email'> | Omit<User, 'username'>;

export type UserSignUp = {
  username: string;
  email: string;
  password: string;
};

export interface Token {
  access: string;
  refresh: string;
}
