import styles from './Layout.module.scss';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const { container } = styles;
  return (
    <>
      <Header />
      <main className={container}>
        <Outlet />
      </main>
    </>
  );
}
