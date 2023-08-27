import { useParams } from 'react-router-dom';
import Form from '../../components/Form/Form';
import {
  useGetArticleQuery,
  usePutArticleEditMutation,
} from '../../redux/BlogAPI';
import getCookie from '../../coockie';
import { Spin } from 'antd';

const userToken = getCookie('Token');
export default function ArticleEditPage() {
  const { slug } = useParams();
  const { data = {}, isLoading } = useGetArticleQuery(slug);
  const [editArticle] = usePutArticleEditMutation();
  const getData = () => {
    return [
      { type: 'title', name: 'Edit article' },
      {
        type: 'input',
        name: 'Title',
        label: 'title',
        defaultValue: data?.article.title,
        validate: {
          required: 'Обязательное поле',
          minLength: { value: 3, message: 'Минимальная длина 3 символа' },
        },
      },
      {
        type: 'input',
        name: 'Short description',
        label: 'description',
        defaultValue: data?.article.description,
        validate: {
          required: 'Обязательное поле',
        },
      },
      {
        type: 'text',
        name: 'text',
        defaultValue: data?.article.body,
        label: 'body',
        validate: {
          required: 'Обязательное поле',
        },
      },
      {
        type: 'tags',
        name: 'Tags',
        defaultValue: data?.article.tagList,
        label: 'tagList',
      },

      {
        type: 'button',
        name: 'Send',
        label: 'Send',
      },
    ];
  };

  const onSubmit = async (data) => {
    const res = {
      data,
      userToken,
      slug,
    };
    editArticle(res);
  };
  return isLoading ? (
    <Spin />
  ) : (
    <Form data={getData()} onSubmit={onSubmit} type={'article'} />
  );
}
