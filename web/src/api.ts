import axios from 'axios';
import {
  ChangePasswordDto,
  EditProfileDto,
  Task,
  Token,
  User,
  UserLogin,
} from './entity';

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
  await axios.post('/api/user/signup', user);
}

/**
 *  Change the password of current user.
 * @param changePasswordDto the old and new password
 */
export async function changePassword(
  changePasswordDto: ChangePasswordDto,
): Promise<void> {
  setJwtToken();
  await axios.put('/api/user/change-password', changePasswordDto);
}

export async function editProfile(
  editProfileDto: EditProfileDto,
): Promise<void> {
  setJwtToken();
  await axios.put('/api/user/edit-profile', editProfileDto);
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
 * Get all recording tasks of current user.
 * @returns the recording tasks of current user
 */
export async function getAllTasks(): Promise<Task[]> {
  setJwtToken();
  const response = await axios.get<Task[]>('/api/task/user');
  return response.data;
}

/**
 *  Get the audio url of a recording task.
 * @param taskId the task id
 * @param blockId the block id
 * @returns the audio url
 */
export async function getAudioUrl(
  taskId: string,
  blockId: number,
): Promise<string> {
  setJwtToken();
  const response = await axios.get<Blob>(`/api/audio/${taskId}/${blockId}`, {
    responseType: 'blob',
  });
  return URL.createObjectURL(response.data);
}

/**
 * Post an audio to a recording task.
 * @param taskId the id of the task
 * @param file the file name of the audio
 * @param blob the blob of the audio
 */
export async function submitTask(
  taskId: string,
  blockId: number,
  blob: Blob,
): Promise<void> {
  setJwtToken();
  const formData = new FormData();
  formData.append('binary', blob);
  await axios.post(`/api/task/submit/${taskId}/${blockId}`, blob, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/**
 * Delete a recording task.
 * @param taskId the task id
 * @param blockId the block id
 */
export async function deleteTask(
  taskId: string,
  blockId: number,
): Promise<void> {
  setJwtToken();
  await axios.post(`/api/task/clear/${taskId}/${blockId}`);
}
