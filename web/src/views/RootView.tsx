import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function RootView() {
  return (
    <>
      <Header />
      <div style={{ marginTop: '3rem' }}>
        <Outlet />
      </div>
    </>
  );
}
