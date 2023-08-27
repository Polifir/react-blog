import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import { usePostUsersMutation } from '../../redux/BlogAPI';

const formData = [
  { type: 'title', name: 'Create new Account' },
  {
    type: 'input',
    name: 'Username',
    label: 'username',
    validate: {
      required: 'Обязательное поле',
      minLength: { value: 3, message: 'Минимальная длина 3 символа' },
      maxLength: { value: 20, message: 'Максимальная длина 20 символов' },
    },
  },
  {
    type: 'input',
    name: 'email',
    label: 'email',
    validate: {
      required: 'Обязательное поле',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'invalid email address',
      },
    },
  },
  { type: 'repetPassword', name: 'Password', label: 'Password' },
  {
    type: 'checkbox',
    name: 'I agree to the processing of my personal information',
    label: 'lins',
    validate: {
      required: 'Обязательное поле',
    },
  },
  {
    type: 'button',
    name: 'Create',
    label: 'create',
  },
  {
    type: 'descr',
    name: 'Already have an account?',
    label: 'sign-in',
    link: 'Sign In',
  },
];

export default function SignUpPage() {
  const [addUser] = usePostUsersMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { username, email, password } = data;

    const user = {
      user: {
        username,
        email,
        password,
      },
    };
    const res = await addUser(user);
    if (res.error?.status === 422) {
      return alert(
        `Данный ${
          res.error.data.errors?.username ? 'username' : 'email'
        } уже  ипользуется`
      );
    }
    navigate('/sign-in');
  };

  return <Form data={formData} onSubmit={onSubmit} />;
}
