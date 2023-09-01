import { useDispatch } from 'react-redux';
import Form from '../../components/Form';
import { usePostUsersLoginMutation } from '../../redux/BlogAPI';
import { signIn } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const formData = [
  { type: 'title', name: 'Sign In' },
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
  {
    type: 'password',
    name: 'Password',
    label: 'password',
    validate: {
      required: 'Обязательное поле',
      minLength: { value: 6, message: 'Минимальная длина 6 символа' },
      maxLength: { value: 40, message: 'Максимальная длина 40 символов' },
    },
  },
  {
    type: 'button',
    name: 'Login',
    label: 'Login',
  },
  {
    type: 'descr',
    name: 'Don’t have an account?',
    label: 'sign-up',
    link: ' Sign Up.',
  },
];

export default function SignInPage() {
  const [addUser] = usePostUsersLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log('DATA SIGN IN', data);
    const { email, password } = data;
    const user = {
      user: {
        email,
        password,
      },
    };
    const res = await addUser(user);
    if (res.error?.status === 422) {
      return alert('Не верный логин или пароль');
    }
    dispatch(signIn(res.data));
    navigate('/');
  };

  return <Form data={formData} onSubmit={onSubmit} />;
}
