import Form from '../../components/Form';
import getCookie from '../../coockie';
import { usePutUsersEditMutation } from '../../redux';
import { updateUser } from '../../redux/userSlice';

export default function EditProfilePage() {
  const [editProfile] = usePutUsersEditMutation();
  const userToken = getCookie('Token');
  const user = JSON.parse(localStorage.getItem(userToken));
  console.log('user', user);

  const formData = [
    { type: 'title', name: 'Edit Profile' },
    {
      type: 'input',
      name: 'Username',
      label: 'username',
      defaultValue: user.username,
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
      defaultValue: user.email,
      validate: {
        required: 'Обязательное поле',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'invalid email address',
        },
      },
    },
    {
      type: 'input',
      name: 'New password',
      label: 'Password',
      validate: {
        required: 'Обязательное поле',
        minLength: { value: 6, message: 'Минимальная длина 6 символа' },
        maxLength: { value: 40, message: 'Максимальная длина 40 символов' },
      },
    },
    { type: 'input', name: 'Avatar image (url)', label: 'RepetPassword' },
    {
      type: 'button',
      name: 'Save',
      label: 'save',
    },
  ];

  const onSubmit = (data) => {
    const dataRes = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
        image: data.image,
      },
      userToken,
    };
    console.log(dataRes);
    updateUser(dataRes);
    editProfile({ data, userToken });
  };
  return <Form data={formData} onSubmit={onSubmit} />;
}
