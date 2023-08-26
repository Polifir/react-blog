/* eslint-disable react/prop-types */
import { Spin } from 'antd';
import Article from '../Article/Article';
import styles from './ArticleList.module.scss';

export default function ArticleList({ articles, isLoading }) {
  const { container } = styles;
  return (
    <main className={container}>
      {isLoading && <Spin />}
      {articles ? (
        articles.map((e, i) => <Article key={i} obj={e} />)
      ) : (
        <p>No data</p>
      )}
    </main>
  );
}
