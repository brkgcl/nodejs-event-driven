import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';

const ForgotPasswordPage = () => {
  const [formData, setFormData] = useState({ email: '' });
  const { email } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log('email :', email);
  };

  return (
    <div className="w-full bg-red-200 h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="w-1/3 h-1/4 flex items-center justify-center bg-red-300 text-white">
        <form onSubmit={onSubmitHandler} action="">
          <h2 className="text-sm">doğrualama bağlantısı gönder</h2>
          <div className="w-full flex p-2 gap-2">
            <input
              type="email"
              id="email"
              name="email"
              onChange={onChange}
              value={email}
              placeholder="email"
              className="bg-transparent border border-1 rounded-lg p-2 outline-none"
            />
            <button className="bg-indigo-600 flex items-center justify-center p-2 rounded-lg">
              gönder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
