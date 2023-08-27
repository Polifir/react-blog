import { useState } from 'react';
import ArticleList from '../../components/ArticleList/ArticleList';
import { useGetArticlesListQuery } from '../../redux';
import { ConfigProvider, Pagination, Spin } from 'antd';
import { useSelector } from 'react-redux';

export default function MainPage() {
  const [artcileSkip, setArtcileSkip] = useState(0);
  const userToken = useSelector((state) => state.user.jwt);
  const clickPagination = (count) => {
    setArtcileSkip(count !== 1 ? 20 * count : 0);
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
          defaultCurrent={1}
          total={data.articlesCount - 20}
          onChange={clickPagination}
        />
      </ConfigProvider>
    </div>
  );
}
