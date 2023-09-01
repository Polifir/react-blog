import { useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();
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
          pattern: {
            value: /[^\s+|\s+$]/g,
            message: 'Не может содержать лишь одни пробелы',
          },
        },
      },
      {
        type: 'input',
        name: 'Short description',
        label: 'description',
        defaultValue: data?.article.description,
        validate: {
          required: 'Обязательное поле',
          pattern: {
            value: /[^\s+|\s+$]/g,
            message: 'Не может содержать лишь одни пробелы',
          },
        },
      },
      {
        type: 'text',
        name: 'text',
        defaultValue: data?.article.body,
        label: 'body',
        validate: {
          required: 'Обязательное поле',
          pattern: {
            value: /[^\s+|\s+$]/g,
            message: 'Не может содержать лишь одни пробелы',
          },
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
    console.log(data);
    const res = {
      data: {
        ...data,
        tagList: data.tagList.filter((e) => !(e.trim() === '')),
      },
      userToken,
      slug,
    };
    editArticle(res);
    navigate('/');
  };
  return isLoading ? (
    <Spin />
  ) : (
    <Form data={getData()} onSubmit={onSubmit} type={'article'} />
  );
}
