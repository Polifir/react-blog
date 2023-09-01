import { useDispatch } from 'react-redux';
import Form from '../../components/Form';
import getCookie from '../../coockie';
import { usePutUsersEditMutation } from '../../redux';
import { updateUser } from '../../redux/userSlice';

export default function EditProfilePage() {
  const [editProfile] = usePutUsersEditMutation();
  const dispatch = useDispatch();
  const userToken = getCookie('Token');
  const user = JSON.parse(localStorage.getItem(userToken));

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
        pattern: {
          value: /[a-zA-Z0-9]+/g,
          message: 'Только латинские буквы и цифры',
        },
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
      type: 'password',
      name: 'New password',
      label: 'password',
      validate: {
        required: 'Обязательное поле',
        minLength: { value: 6, message: 'Минимальная длина 6 символа' },
        maxLength: { value: 40, message: 'Максимальная длина 40 символов' },
      },
    },
    { type: 'input', name: 'Avatar image (url)', label: 'image' },
    {
      type: 'button',
      name: 'Save',
      label: 'save',
    },
  ];

  const onSubmit = async (data) => {
    const dataRes = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
        image: data.image,
      },
      userToken,
    };
    const res = await editProfile(dataRes);
    if (res.error?.status === 422) {
      return alert(
        res.error.data.errors?.username
          ? `username ${res.error.data.errors.username} `
          : `email ${res.error.data.errors.email} `
      );
    }
    dispatch(updateUser(dataRes));
  };
  return <Form data={formData} onSubmit={onSubmit} />;
}
