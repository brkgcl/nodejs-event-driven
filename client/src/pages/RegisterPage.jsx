import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useRegisterMutation } from '../redux/api/endpoints/auth/register';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [register] = useRegisterMutation();
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
    const result = await register(userData);

    console.log('userData :', result);

    navigate('/profile');
  };

  return (
    <div className="bg-blue-300 w-full h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="bg-blue-400 p-2 w-1/3 h-1/4">
        <form
          action=""
          onSubmit={onSubmitHandler}
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="w-full flex gap-2">
            <input
              type="text"
              id="name"
              name="name"
              onChange={onChange}
              value={name}
              placeholder="name"
              className="w-1/2 p-2"
            />
            <input
              type="text"
              id="surname"
              name="surname"
              onChange={onChange}
              value={surname}
              placeholder="surname"
              className="w-1/2 p-2"
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <input
              type="email"
              id="email"
              name="email"
              onChange={onChange}
              value={email}
              placeholder="email"
              className="p-2"
            />
            <input
              type="text"
              id="password"
              name="password"
              onChange={onChange}
              value={password}
              placeholder="password"
              className="p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 w-full p-3 rounded-lg text-white"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
