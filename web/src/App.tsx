import { CssBaseline } from '@mui/material';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import HomeView from './views/HomeView';
import RecordingView from './views/RecordingView';
import RootView from './views/RootView';
import SigninView from './views/SigninView';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootView />}>
      <Route index element={<HomeView />} />
      <Route path="/recording" element={<RecordingView />} />
      {/* TODO */}
      <Route path="/public" element={<>NOT IMPLEMENTED YET!!!</>} />
      <Route path="/signin" element={<SigninView />} />
    </Route>
  )
);

export default function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
}
