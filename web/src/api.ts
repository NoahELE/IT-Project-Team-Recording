import axios from 'axios';
import { Recording, Token, User, UserLogin } from './entity';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

/**
 * Login a user and stores the JWT token returned in local storage.
 * @param user the user that logs in
 */
export async function login(user: UserLogin): Promise<void> {
  const response = await axios.post<Token>('/api/user/login', user);
  const token = response.data;
  localStorage.setItem('token', JSON.stringify(token));
}

/**
 * Register a user.
 * @param user the user that registers
 */
export async function register(user: User): Promise<void> {
  await axios.post('/api/user/register', user);
}

/**
 * Set the JWT token in the Authorization header of axios. Call this function
 * before you want to request an API that requires authentication.
 */
export function setJwtToken(): void {
  const tokenStr = localStorage.getItem('token');
  if (tokenStr === null) {
    throw new Error('It seems that you are not logged in. Please login first.');
  }
  const token = JSON.parse(tokenStr) as Token;
  if (!token.access || !token.refresh) {
    throw new Error('It seems that your token is invalid. Please login again.');
  }
  axios.defaults.headers.common.Authorization = `Bearer ${token.access}`;
}

/**
 * Get all recordings of current user.
 * @returns the recordings of current user
 */
export async function getAllRecordings(): Promise<Recording[]> {
  setJwtToken();
  const response = await axios.get<Recording[]>('/api/recording');
  return response.data;
}

/**
 * Delete a recording with the given id.
 * @param id the id of the recording to be deleted
 */
export async function deleteRecording(id: string): Promise<void> {
  setJwtToken();
  await axios.delete(`/api/recording/${id}`);
}
