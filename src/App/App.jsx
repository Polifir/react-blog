/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route } from 'react-router-dom';
import ArticlePage from '../pages/ArticlePage';
import MainPage from '../pages/MainPage';
import styles from './App.module.scss';
import Layout from '../pages/Layout/Layout';
import SignUpPage from '../pages/SignUpPage';
import SignInPage from '../pages/SignInPage';
import EditProfilePage from '../pages/EditProfilePage';
import { store } from '../redux';
import { useEffect } from 'react';
import { auth } from '../redux/userSlice';
import getCookie from '../coockie';
import RequierAuth from '../hoc';
import CreateArticlePage from '../pages/CreateArticlePage';
import ArticleEditPage from '../pages/ArticleEditPage/ArticleEditPage';

function App() {
  const { section } = styles;
  const userToken = getCookie('Token');
  useEffect(() => {
    store.dispatch(auth(userToken));
  }, []);
  return (
    <section className={section}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<MainPage />} />
          <Route path='/:skipArticle' element={<MainPage />} />
          <Route path='/article/:slug' element={<ArticlePage />} />
          <Route
            path='/article/:slug/edit'
            element={
              <RequierAuth>
                <ArticleEditPage />
              </RequierAuth>
            }
          />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/sign-in' element={<SignInPage />} />
          <Route
            path='/edit-profile'
            element={
              <RequierAuth>
                <EditProfilePage />
              </RequierAuth>
            }
          />
          <Route
            path='/create-article'
            element={
              <RequierAuth>
                <CreateArticlePage />
              </RequierAuth>
            }
          />
        </Route>
      </Routes>
    </section>
  );
}

export default App;
