import { useParams } from 'react-router-dom';
import Article from '../../components/Article/Article';
import { useGetArticleQuery } from '../../redux';
import { Spin } from 'antd';

export default function ArticlePage() {
  const { slug } = useParams();
  const { data = {}, isLoading } = useGetArticleQuery(slug);
  return isLoading ? <Spin /> : <Article obj={data.article} small={false} />;
}
