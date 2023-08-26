import { useState } from 'react';
import ArticleList from '../../components/ArticleList/ArticleList';
import { useGetArticlesListQuery } from '../../redux';
import { ConfigProvider, Pagination } from 'antd';

export default function MainPage() {
  const [artcileSkip, setArtcileSkip] = useState(0);
  const clickPagination = (count) => {
    setArtcileSkip(count !== 1 ? 20 * count : 0);
  };

  const { data = { articles: [], articlesCount: 5 }, isLoading } =
    useGetArticlesListQuery(artcileSkip);
  return (
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
          total={data.articlesCount}
          onChange={clickPagination}
        />
      </ConfigProvider>
    </div>
  );
}
