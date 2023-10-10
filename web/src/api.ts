import axios from 'axios';
import {
  ChangePasswordDto,
  EditProfile,
  Recording,
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
  await axios.post('/api/user/register', user);
}

/**
 *  Change the password of current user.
 * @param changePasswordDto the old and new password
 */
export async function changePassword(
  changePasswordDto: ChangePasswordDto,
): Promise<void> {
  setJwtToken();
  await axios.post('/api/user/change-password', changePasswordDto);
}

export async function editProfile(editProfile: EditProfile): Promise<void> {
  setJwtToken();
  await axios.post('/api/user/edit-profile', editProfile);
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

/**
 * Update a recording.
 * @param recording the recording to be updated
 */
export async function updateRecording(
  id: string,
  recording: Partial<Recording>,
  recordingBlob: Blob,
): Promise<void> {
  setJwtToken();
  await axios.put(`/api/recording/${id}`, recording);
  // TODO save binary recording data
  console.log(recordingBlob);
}

/**
 * Create a recording.
 * @param recording the recording to be created
 * @param recordingBlob the binary data of the recording
 */
export async function createRecording(
  recording: Omit<Recording, 'id' | 'audioUrl' | 'text'>,
  recordingBlob: Blob,
): Promise<void> {
  setJwtToken();
  await axios.post('/api/recording', recording);
  // TODO save binary recording data
  console.log(recordingBlob);
}
