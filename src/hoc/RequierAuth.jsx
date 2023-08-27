/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import getCookie from '../coockie';

export default function RequierAuth({ children }) {
  const auth = getCookie('Token');

  if (!auth) {
    return <Navigate to='/sign-in' />;
  }
  return children;
}
