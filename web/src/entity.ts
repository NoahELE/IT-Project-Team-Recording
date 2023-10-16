export interface Task {
  id: string;
  text: string;
  file: string;
  has_existing: boolean;
}

export interface TaskResponse {
  task_id: string;
  data: Task[];
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
  oldPassword: string;
  newPassword: string;
}

export interface EditProfile {
  username: string;
  email: string;
}

export type UserLogin = Omit<User, 'email'> | Omit<User, 'username'>;

export interface Token {
  access: string;
  refresh: string;
}
