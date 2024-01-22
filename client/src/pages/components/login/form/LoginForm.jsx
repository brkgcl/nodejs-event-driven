import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/Button';
import { Container } from '../../../../components/Container';
import { useLoginMutation } from '../../../../redux/api/endpoints/auth/login';
import { useEffect, useState } from 'react';
import { ForgotPasswordModal } from '../ForgotPasswordModal';

export const LoginForm = () => {
  const [login, { isSuccess, isLoading }] = useLoginMutation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [openModal, setOpenModal] = useState(false);

  const { email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/profile');
    }
  }, [isSuccess, isLoading, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  const forgotPasswordModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <Container width="w-4/6" height="" className="flex-col pt-2">
      <ForgotPasswordModal open={openModal} onClose={forgotPasswordModal} />
      <form className="w-full flex flex-col gap-1" action="">
        <div className="w-full h-3/5 flex flex-col gap-1">
          <input
            className="w-full p-2 outline-none rounded-lg h-20 pl-6 bg-white/60"
            type="email"
            placeholder="email"
            id="email"
            name="email"
            onChange={onChange}
            value={email}
          />
          <input
            className="w-full p-2 outline-none rounded-lg h-20 pl-6 bg-white/60"
            type="password"
            placeholder="password"
            id="password"
            name="password"
            onChange={onChange}
            value={password}
          />
        </div>
        <p
          onClick={forgotPasswordModal}
          className="underline text-xs text-right cursor-pointer text-white"
        >
          forgot password
        </p>
        <Button onClick={onSubmitHandler} color="bg-indigo-600" height="h-3/5">
          Submit
        </Button>
      </form>
    </Container>
  );
};
