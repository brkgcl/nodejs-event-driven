import React, { useEffect, useState } from 'react';
import { useProfileMutation } from '../redux/api/endpoints/user/profile';
import ProfileCard from './components/profile/ProfileCard';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
const ProfilePage = () => {
  const [state, setState] = useState(0);
  const [profile, { isSuccess, isLoading, isError }] = useProfileMutation();
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();

  // sürekli çalışıyor
  useEffect(() => {
    if (isSuccess) {
      setState(1);
    }
    if (isError) {
      console.log('errrrrrrrrr');
      navigate('/auth/login');
    }
  }, [isError, navigate, isLoading, isSuccess]);

  useEffect(() => {
    if (!token) {
      navigate('/auth/login');
    }
    async function getUser() {
      await profile().unwrap();
    }
    getUser();
  }, [navigate, profile, token]);

  return (
    <div className="h-screen w-full bg-[#3E5E72] overflow-hidden">
      {state === 1 ? (
        <>
          <Navbar />
          <ProfileCard />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ProfilePage;
