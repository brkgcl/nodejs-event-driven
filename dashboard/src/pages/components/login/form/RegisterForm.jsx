import { useEffect, useState } from 'react';
import { Button } from '../../../../components/Button';
import { Container } from '../../../../components/Container';
import { useRegisterMutation } from '../../../../redux/api/endpoints/auth/register';
import { useNavigate } from 'react-router-dom';

export const RegisterForm = () => {
  const [register, { isSuccess, isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });
  const { name, surname, email, password } = formData;

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
    const userData = {
      name: {
        givenName: name,
        familyName: surname,
      },
      email: {
        value: email,
      },
      token: password,
    };
    await register(userData);
  };

  return (
    <Container width="w-4/6" className="flex-col p-1">
      <form className="w-full flex flex-col gap-1" action="">
        <div className="flex gap-1 h-20">
          <input
            type="text"
            className="w-full p-2  rounded-lg outline-none h-full pl-6 bg-white/60"
            placeholder="name"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
          />
          <input
            type="text"
            className="w-full p-2  rounded-lg outline-none h-full pl-6 bg-white/60"
            placeholder="surname"
            id="surname"
            name="surname"
            value={surname}
            onChange={onChange}
          />
        </div>
        <input
          className="w-full p-2 outline-none rounded-lg h-20  pl-6 bg-white/60"
          type="email"
          placeholder="email"
          id="email"
          name="email"
          value={email}
          onChange={onChange}
        />
        <input
          className="w-full p-2 outline-none rounded-lg h-20  pl-6 bg-white/60"
          type="text"
          placeholder="password"
          id="password"
          name="password"
          value={password}
          onChange={onChange}
        />
        {/* <button className="h-2/5 bg-indigo-600 w-full rounded-lg" type="submit">
          Register
        </button> */}
        <Button onClick={onSubmitHandler} color="bg-indigo-600" height="h-2/5">
          Submit
        </Button>
      </form>
    </Container>
  );
};
