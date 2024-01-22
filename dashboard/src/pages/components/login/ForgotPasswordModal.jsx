import Modal from 'react-responsive-modal';
import { Button } from '../../../components/Button';
import { Container } from '../../../components/Container';
import { useForgotPasswordMutation } from '../../../redux/api/endpoints/auth/forgot_password';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const ForgotPasswordModal = (props) => {
  const [forgotPassword, { isSuccess, isLoading }] =
    useForgotPasswordMutation();
  const [formData, setFormData] = useState({ email: '' });
  const { email } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success('Sending reflesh email');
    }
  }, [isSuccess, isLoading]);

  const onSubmitHandler = async () => {
    await forgotPassword({ email });
    props.onClose();
  };
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Container
        color="red-200"
        height="h-60"
        width="w-[500px]"
        className="flex-col -m-6"
      >
        <div className="flex flex-col gap-3">
          <h2 className="text-sm">
            Sifre yenileme baglantısı almak için email adresinizi girin..
          </h2>
          <div className="flex gap-2 p-2">
            <label className="p-2 text-black/60 font-medium" htmlFor="">
              email
            </label>
            <input
              type="text"
              placeholder="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              className="bg-white/20 outline-none border border-solid border-1 rounded-lg p-2"
            />
            <Button
              onClick={onSubmitHandler}
              color="bg-indigo-600"
              className="p-2"
            >
              send
            </Button>
          </div>
        </div>
      </Container>
    </Modal>
  );
};
