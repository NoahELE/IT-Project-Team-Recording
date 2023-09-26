import { CssBaseline } from '@mui/material';
import { lazy } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

const HomeView = lazy(() => import('./views/HomeView'));
const LoginView = lazy(() => import('./views/LoginView'));
const ProfileView = lazy(() => import('./views/ProfileView'));
const PublicRecordsView = lazy(() => import('./views/PublicRecordsView'));
const RecordingView = lazy(() => import('./views/RecordingView'));
const RegisterView = lazy(() => import('./views/RegisterView'));
const RootView = lazy(() => import('./views/RootView'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootView />}>
      <Route index element={<HomeView />} />
      <Route path="/recording" element={<RecordingView />} />
      <Route path="/public" element={<PublicRecordsView />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<RegisterView />} />
      <Route path="/profile" element={<ProfileView />} />
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
