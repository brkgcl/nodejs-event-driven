import { Route, Routes } from 'react-router-dom';
// import Login from './pages/LoginPage';
// import Register from './pages/RegisterPage';
import Home from './pages/HomePage';
import Profile from './pages/ProfilePage';
import EmailVerificationPage from './pages/EmailVerification';
// import ForgotPasswordPage from './pages/ForgotPasswordPage';
// import GooglePage from './pages/GooglePage';
import Layout from './components/Layout';
import RequireAuth from './controller/RequireAuth';
import Authentication from './pages/Authentication';
import LoginCallback from './pages/components/login/LoginCallback';
// import env from 'react-dotenv';

function App() {
  console.log('NODE_ENV :', process.env.NODE_ENV);
  console.log('AUTH :', process.env.REACT_APP_AUTH_BACKEND);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/auth/login" element={<Authentication state={1} />} />
        <Route path="/auth/register" element={<Authentication state={0} />} />
        <Route path="/auth/callback" element={<LoginCallback />} />
        <Route path="/profile" element={<Profile />} />

        <Route element={<RequireAuth />}>
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/email-verify" element={<EmailVerificationPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

/**
 <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify" element={<EmailVerificationPage />} />
        <Route path="/forgat-password" element={<ForgotPasswordPage />} />
        <Route path="/google" element={<GooglePage />} />
      </Routes>
 */
