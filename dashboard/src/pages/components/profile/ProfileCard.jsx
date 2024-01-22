import React from 'react';
import { Container } from '../../../components/Container';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/features/userSlice';
import { Button } from '../../../components/Button';

const ProfileCard = () => {
  const user = useSelector(selectCurrentUser);
  const name = user.displayName.split(' ')[0];
  const surname = user.displayName.split(' ')[1];
  return (
    <Container height="h-full" width="w-full" className="">
      <Container
        height="h-2/3"
        width="w-2/3"
        className="drop-shadow-2xl shadow-lg  backdrop-blur-md bg-white/10 rounded-xl p-8"
      >
        <Container className="flex-col gap-2">
          <table className="  w-full">
            <tr className="">
              <td className="p-2 ">
                <label className="flex items-center justify-center font-bold text-red-400 ">
                  name:
                </label>
              </td>
              <td className="p-2 flex gap-2">
                <input
                  type="text"
                  // placeholder="name"
                  placeholder={name}
                  defaultValue={name}
                  className="w-full outline-none border border-1 border-solid rounded-lg opacity-40 p-3 text-black font-medium"
                />
                <label className="flex items-center justify-center font-bold text-red-400 ">
                  surname:
                </label>
                <input
                  type="text"
                  placeholder={surname}
                  defaultValue={surname}
                  className="w-full outline-none border border-1 border-solid rounded-lg opacity-40 p-3 text-black font-medium"
                />
              </td>
            </tr>
            <tr className="p-5  ">
              <label className="flex mt-4 h-full items-center justify-center font-bold text-red-400 ">
                email:
              </label>
              <td className="p-2 ">
                <input
                  type="text"
                  placeholder={user.email}
                  defaultValue={user.email}
                  className="w-full outline-none border border-1 border-solid rounded-lg opacity-40 p-3 text-black font-medium"
                />
              </td>
            </tr>
            <tr className="p-5 ">
              <label className="flex mt-4  items-center justify-center font-bold text-red-400 ">
                password:
              </label>
              <td className="p-2 ">
                <input
                  type="text"
                  placeholder="*******"
                  className="w-full outline-none border border-1 border-solid rounded-lg opacity-40 p-3 text-black font-medium"
                />
              </td>
            </tr>
            <tr className="p-5 ">
              <td className="p-2 ">
                <label className="flex  items-center justify-center font-bold text-red-400 ">
                  verified:
                </label>
              </td>
              <td className="p-3 text-white font-bold">
                {user.verified === true ? 'true' : 'false'}
              </td>
            </tr>
          </table>
          <div className="flex gap-2 items-end p-3">
            <Button
              color="bg-indigo-600"
              className="py-3 px-6"
              textColor="white"
            >
              update
            </Button>
            <Button
              color="bg-indigo-600"
              className="py-3 px-6"
              textColor="white"
            >
              delete
            </Button>
          </div>
        </Container>
      </Container>
    </Container>
  );
};

export default ProfileCard;

/*
 <table className="border p-5 border-solid border-1  w-full">
          <tr className="p-5 border border-solid border-1">
            <td className="p-2 border border-solid border-1 text-red-400">
              isim
            </td>
            <td className="p-2 border border-solid border-1">
              {user.displayName}
            </td>
          </tr>
          <tr className="p-5 border border-solid border-1">
            <td className="p-2 border border-solid border-1 text-red-400">
              email
            </td>
            <td className="p-2 border border-solid border-1">{user.email}</td>
          </tr>
          <tr className="p-5 border border-solid border-1">
            <td className="p-2 border border-solid border-1 text-red-400">
              verified
            </td>
            <td className="p-2 border border-solid border-1">
              {user.verified === true ? 'true' : 'false'}
            </td>
          </tr>
        </table>
*/

/**
           <div className="flex w-full gap-2">
            <label className="flex items-center justify-center font-bold text-red-400 ">
              email:
            </label>
            <input
              type="text"
              placeholder="name"
              className="w-full outline-none border border-1 border-solid rounded-lg opacity-20 p-3"
            />
            <label className="flex items-center justify-center font-bold text-red-400">
              surname:
            </label>
            <input
              type="text"
              placeholder="surname"
              className="w-full outline-none border border-1 border-solid rounded-lg opacity-20 p-3"
            />
          </div>
          <div className="flex w-full">
            <label className="flex items-center justify-center font-bold text-red-400">
              email:
            </label>
            <input
              type="text"
              placeholder="email"
              className="w-full outline-none border border-1 border-solid rounded-lg opacity-20 p-3"
            />
          </div>
          <div className="flex w-full">
            <label className="flex items-center justify-center font-bold text-red-400">
              password:
            </label>
            <input
              type="password"
              placeholder="password"
              className="w-full outline-none border border-1 border-solid rounded-lg opacity-20 p-3"
            />
          </div>
          <div></div>
          <div className="flex w-1/2 gap-2">
            <Button>Uptade</Button>
            <Button>Delete</Button>
          </div>
 */
