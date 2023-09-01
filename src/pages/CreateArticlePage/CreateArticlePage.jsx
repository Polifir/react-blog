import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form/Form';
import { usePostAticleMutation } from '../../redux/BlogAPI';
import { useSelector } from 'react-redux';
const formData = [
  { type: 'title', name: 'Create new Article' },
  {
    type: 'input',
    name: 'Title',
    label: 'title',
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
    label: 'tagList',
    defaultValue: [''],
  },

  {
    type: 'button',
    name: 'Send',
    label: 'Send',
  },
];
export default function CreateArticlePage() {
  const [addArticle] = usePostAticleMutation();
  const navigate = useNavigate();
  const userToken = useSelector((state) => state.user.jwt);
  const onSubmit = (data) => {
    const res = {
      article: {
        ...data,
        tagList: data.tagList.filter((e) => !(e.trim() === '')),
      },
      userToken,
    };
    addArticle(res);
    navigate('/');
  };
  return <Form data={formData} onSubmit={onSubmit} type={'article'} />;
}
