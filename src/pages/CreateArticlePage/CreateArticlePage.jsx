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
    },
  },
  {
    type: 'input',
    name: 'Short description',
    label: 'description',
    validate: {
      required: 'Обязательное поле',
    },
  },
  {
    type: 'text',
    name: 'text',
    label: 'body',
    validate: {
      required: 'Обязательное поле',
    },
  },
  {
    type: 'tags',
    name: 'Tags',
    label: 'tagList',
    defaultValue: [''],
    validate: {
      required: 'Обязательное поле',
    },
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
      article: data,
      userToken,
    };
    addArticle(res);
    navigate('/');
  };
  return <Form data={formData} onSubmit={onSubmit} type={'article'} />;
}
