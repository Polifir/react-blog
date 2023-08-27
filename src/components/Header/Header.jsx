/* eslint-disable no-useless-escape */
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames';
import skeleton from '../../assets/profileSkeleton.png';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/userSlice';
import getCookie from '../../coockie';

export default function Header() {
  const {
    header,
    logo,
    menu,
    btn,
    btn_green,
    btn_black,
    bio,
    bio_text,
    bio_img_container,
    img,
  } = styles;
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userToken = getCookie('Token');
  const { user } = userData;
  return (
    <header className={header}>
      <Link to='/' className={classNames(logo)}>
        Realworld Blog
      </Link>

      <div className={menu}>
        {user?.username ? (
          <>
            <Link className={classNames(btn, btn_green)} to='/create-article'>
              Create article
            </Link>

            <Link className={bio} to='/edit-profile'>
              <span className={bio_text}>{user.username}</span>
              <div className={bio_img_container}>
                <img
                  src={user.image ? user.image : skeleton}
                  alt=''
                  className={img}
                />
              </div>
            </Link>

            <Link
              to='/'
              className={classNames(btn, btn_black)}
              onClick={() => dispatch(logOut(userToken))}
            >
              Log Out
            </Link>
          </>
        ) : (
          <>
            <Link className={classNames(btn)} to='/sign-in'>
              Sign In
            </Link>
            <Link to='/sign-up' className={classNames(btn, btn_green)}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
