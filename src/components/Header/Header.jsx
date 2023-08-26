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
    link,
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
      <Link to='/'>
        <button className={classNames(btn, logo)}>Realworld Blog</button>
      </Link>
      <div className={menu}>
        {user?.username ? (
          <>
            <Link className={link} to='/create-article'>
              <button className={classNames(btn, btn_green)}>
                Create article
              </button>
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
            <button
              className={classNames(btn, btn_black)}
              onClick={() => dispatch(logOut(userToken))}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link className={link} to='/sign-in'>
              <button className={btn}>Sign In</button>
            </Link>
            <Link to='/sign-up'>
              <button className={classNames(btn, btn_green)}>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
