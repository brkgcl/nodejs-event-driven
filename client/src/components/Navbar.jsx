import React from 'react';
import { CiLogout } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { loqOut, selectCurrentUser } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const distpatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    navigate('/auth/login');
    await distpatch(loqOut());
  };
  return (
    <div className="w-full h-20  drop-shadow-2xl shadow-lg  backdrop-blur-md bg-[#3E5E72]/20 flex items-center justify-between p-3">
      <div className="w-1/4">
        <h2 className="text-3xl font-bold">LOGO</h2>
        <p className="text-xs opacity-60">
          Lorem ipsum dolor sit amet consectetur.
        </p>
      </div>
      <div className="w-1/4">
        <input
          type="text"
          className=" outline-none p-2 rounded-lg bg-white/10 w-full text-white/50"
          placeholder="search.."
        />
      </div>
      <div className="w-1/5 h-full flex gap-2 bg-[#3E5E72]/90 rounded-lg p-1 px-3">
        <div className="h-12 w-12 flex ">
          <img src={user.pictures} alt="" className="rounded-full" />
        </div>
        <div className="flex flex-col items-start justify-center">
          <h2 className="text-sm font-serif">{user.displayName}</h2>
          <p className="text-xs">{user.email}</p>
        </div>
        <div
          onClick={onSubmitHandler}
          className="flex flex-col items-center justify-center"
        >
          <CiLogout color="white" size={22} />
          {/* <p className="text-xs font-light">logout</p> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
