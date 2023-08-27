/* eslint-disable react/prop-types */
import heart from '../../assets/heart.svg';
import heartActive from '../../assets/heartActive.svg';
import styles from './Article.module.scss';
import { format } from 'date-fns';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import {
  useDeleteArticleMutation,
  usePostArticleFavoritedMutation,
  usePostArticleUnFavoritedMutation,
} from '../../redux/BlogAPI';
import { Button, Popconfirm } from 'antd';
import { useSelector } from 'react-redux';
export default function Article({ obj, small = true }) {
  const {
    container,
    article,
    bio,
    nickname,
    date,
    heart_count,
    title,
    header,
    tagList,
    tag,
    descr,
    btn_like,
    heart_container,
    bio_left,
    img_logo,
    img_conatiner,
    top,
    body,
    btn,
    btnEdit,
  } = styles;
  const { author } = obj;
  const {
    slug,
    createdAt,
    description,
    favoritesCount,
    favorited,
    tagList: tagListArr,
    title: titleData,
  } = obj;
  const navigate = useNavigate();
  const { user: userData, jwt: token } = useSelector((state) => state.user);
  const [deleteArticle] = useDeleteArticleMutation();
  const [addFavorited] = usePostArticleFavoritedMutation();
  const [unFavorited] = usePostArticleUnFavoritedMutation();
  const articleUser = token
    ? userData?.username.toLowerCase() === author.username
    : false;
  const clickDelete = () => {
    const data = {
      slug,
      token,
    };
    deleteArticle(data);
    navigate('/');
  };
  const toggleLike = () => {
    const dataRes = {
      slug,
      token,
    };
    console.log(dataRes);
    console.log(obj);
    if (favorited) {
      unFavorited(dataRes);
    } else {
      addFavorited(dataRes);
    }
  };
  return (
    <section className={container}>
      <div className={top}>
        <div className={article}>
          <header className={header}>
            <Link className={title} to={`/article/${slug}`}>
              <h2 className={title}>{titleData}</h2>
            </Link>
            <div className={heart_container}>
              <button className={btn_like} onClick={toggleLike}>
                <img src={favorited ? heartActive : heart} alt='like' />
              </button>
              <span className={heart_count}>{favoritesCount}</span>
            </div>
          </header>
          <ul className={tagList}>
            {tagListArr.map((e, i) => (
              <li key={i} className={tag}>
                {e}
              </li>
            ))}
          </ul>
          <p className={descr}>{description}</p>
        </div>
        <div>
          <div className={bio}>
            <div className={bio_left}>
              <span className={nickname}>{author.username}</span>
              <span className={date}>
                {format(new Date(createdAt), ' MMMM dd, yyyy')}
              </span>
            </div>
            <div className={img_conatiner}>
              <img className={img_logo} src={author.image} alt='avatar' />
            </div>
          </div>
          {articleUser && !small && (
            <>
              <Popconfirm
                title='Delete the task'
                description='Are you sure to delete this task?'
                onConfirm={clickDelete}
                okText='Yes'
                cancelText='No'
              >
                <Button danger>Delete</Button>
              </Popconfirm>
              <Link
                to={`/article/${slug}/edit`}
                className={classNames(btn, btnEdit)}
              >
                Edit
              </Link>
            </>
          )}
        </div>
      </div>
      {!small && <ReactMarkdown className={body}>{obj.body}</ReactMarkdown>}
    </section>
  );
}
