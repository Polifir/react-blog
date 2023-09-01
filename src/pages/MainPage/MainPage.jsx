import { useState } from 'react';
import ArticleList from '../../components/ArticleList/ArticleList';
import { useGetArticlesListQuery } from '../../redux';
import { ConfigProvider, Pagination, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function MainPage() {
  const navigate = useNavigate();
  const params = useParams();
  const patchSkip = +params.skipArticle ? +params.skipArticle : 0;
  const [artcileSkip, setArtcileSkip] = useState(patchSkip);
  const userToken = useSelector((state) => state.user.jwt);
  const clickPagination = (count) => {
    const calcSkipArticle = count - 1 !== 0 ? 20 * (count - 1) : 0;
    setArtcileSkip(() => calcSkipArticle);
    navigate(`/${calcSkipArticle}`);
  };
  const resData = {
    userToken,
    artcileSkip,
  };
  const { data, isLoading } = useGetArticlesListQuery(resData);
  return isLoading ? (
    <Spin />
  ) : (
    <div>
      <ArticleList articles={data.articles} isLoading={isLoading} />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#fff',
            colorBgContainer: '#1890FF',
          },
        }}
      >
        <Pagination
          showSizeChanger={false}
          pageSize={20}
          defaultCurrent={
            artcileSkip ? (artcileSkip === 0 ? 1 : (artcileSkip + 20) / 20) : 1
          }
          total={data.articlesCount}
          onChange={clickPagination}
        />
      </ConfigProvider>
    </div>
  );
}
