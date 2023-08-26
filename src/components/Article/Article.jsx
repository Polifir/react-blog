/* eslint-disable react/prop-types */
import imgSkeleton from '../../assets/profileSkeleton.png';
import heart from '../../assets/heart.svg';
import heartActive from '../../assets/heartActive.svg';
import styles from './Article.module.scss';
import { format } from 'date-fns';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Link } from 'react-router-dom';
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
  } = styles;
  const { author } = obj;
  const {
    slug,
    createdAt,
    favorited,
    description,
    favoritesCount,
    tagList: tagListArr,
    title: titleData,
  } = obj;
  return (
    <section className={container}>
      <div className={top}>
        <div className={article}>
          <header className={header}>
            <Link className={title} to={`/article/${slug}`}>
              <h2 className={title}>{titleData}</h2>
            </Link>
            <div className={heart_container}>
              <button className={btn_like}>
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
        <div className={bio}>
          <div className={bio_left}>
            <span className={nickname}>{author.username}</span>
            <span className={date}>
              {format(new Date(createdAt), ' MMMM dd, yyyy')}
            </span>
          </div>
          <div className={img_conatiner}>
            <img
              className={img_logo}
              src={author.image ? author.image : imgSkeleton}
              alt='avatar'
            />
          </div>
        </div>
      </div>
      {!small && <ReactMarkdown className={body}>{obj.body}</ReactMarkdown>}
    </section>
  );
}
