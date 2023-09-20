import { CssBaseline } from '@mui/material';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView.tsx';
import PublicRecordsView from './views/PublicRecordsView.tsx';
import RecordingView from './views/RecordingView';
import RegisterView from './views/RegisterView.tsx';
import RootView from './views/RootView';
import UserView from './views/UserView.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootView />}>
      <Route index element={<HomeView />} />
      <Route path="/recording" element={<RecordingView />} />
      <Route path="/public" element={<PublicRecordsView />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<RegisterView />} />
      <Route path="/user" element={<UserView />} />
    </Route>,
  ),
);

export default function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
}
