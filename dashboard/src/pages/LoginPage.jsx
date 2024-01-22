import {  useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoginMutation } from '../redux/api/endpoints/auth/login';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setToken } from '../redux/features/userSlice';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (isError) console.log('error :: ');
  //   if (isSuccess) navigate('/profile');
  // }, [isSuccess, isError, isLoading, login]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ email, password }).unwrap();
      console.log('gelen user :', userData);

      navigate('/profile');
    } catch (err) {
      console.log('hata var ::', err);
    }
  };

  return (
    <div className="bg-red-300 w-full h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="bg-red-400 p-2 w-1/3 h-1/4">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col w-full h-full gap-2"
          action=""
        >
          <input
            type="email"
            className="outline-none bg-transparent border border-black rounded-lg p-2"
            placeholder="email"
            id="email"
            name="email"
            onChange={onChange}
            value={email}
          />
          <input
            type="text"
            className="outline-none bg-transparent border border-black rounded-lg p-2"
            placeholder="password"
            id="password"
            name="password"
            onChange={onChange}
            value={password}
          />
          <button type="submit" className="bg-indigo-600 p-3 rounded-lg">
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

// const onSubmitHandler = async (e) => {
//   e.preventDefault();
//   const userData = {
//     email,
//     password,
//   };
//   console.log('user data', userData);

//   const result = await login(userData);
//   // dispatch(setToken(result));
// };
