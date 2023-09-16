import axios from 'axios';
import { Token, User, UserSignIn } from './entity';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

/**
 * Sign in a user and stores the JWT token returned in local storage.
 * @param user the user that signs in
 */
export async function signIn(user: UserSignIn): Promise<void> {
  const response = await axios.post<Token>('/api/user/login', user);
  const token = response.data;
  localStorage.setItem('token', JSON.stringify(token));
}

export async function signUp(user: User): Promise<void> {
  await axios.post('/api/user/signup', user);
}

/**
 * Set the JWT token in the Authorization header of axios. Call this function
 * before you want to request an API that requires authentication.
 */
export function setJwtToken(): void {
  const tokenStr = localStorage.getItem('token');
  if (tokenStr === null) {
    throw new Error('JWT token does not exist in local storage');
  }
  const token = JSON.parse(tokenStr) as Token;
  if (!token.access || !token.refresh) {
    throw new Error('JWT access/refresh token does not exist in parsed token');
  }
  axios.defaults.headers.common.Authorization = `Bearer ${token.access}`;
}
