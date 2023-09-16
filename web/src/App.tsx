import { CssBaseline } from '@mui/material';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import HomeView from './views/HomeView';
import PublicRecordsView from './views/PublicRecordsView.tsx';
import RecordingView from './views/RecordingView';
import RootView from './views/RootView';
import SignInView from './views/SignInView.tsx';
import SignUpView from './views/SignUpView.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootView />}>
      <Route index element={<HomeView />} />
      <Route path="/recording" element={<RecordingView />} />
      <Route path="/public" element={<PublicRecordsView />} />
      <Route path="/signin" element={<SignInView />} />
      <Route path="/signup" element={<SignUpView />} />
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
