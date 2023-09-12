export interface Recording {
  id: string;
  name: string;
  audioUrl: string;
  text: string;
}

export interface existingUser {
  username: string;
  password: string;
}

export interface UserLoginResponse {
  token: string;
}
