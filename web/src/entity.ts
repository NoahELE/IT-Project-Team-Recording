export interface Task {
  task_id: string;
  block_id: number;
  text: string;
  has_existing: boolean;
}

export interface PublicRecord {
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

export interface ChangePasswordDto {
  current_password: string;
  new_password: string;
}

export interface EditProfileDto {
  username: string;
  email: string;
}

export type UserLogin = Omit<User, 'email'> | Omit<User, 'username'>;

export interface Token {
  access: string;
  refresh: string;
}
