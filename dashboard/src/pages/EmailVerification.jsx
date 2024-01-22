import React from 'react';
import {  useNavigate } from 'react-router-dom';

const EmailVerificationPage = () => {
  const navigate = useNavigate()
  const onSubmit = () => {
    navigate('/profile')
  }
  return (
    <div className="w-full h-screen bg-slate-400 flex items-center justify-center">
      <div className="bg-slate-600 w-1/3 h-1/4 text-white flex flex-col items-center justify-center p-3 gap-3">
        <h1 className="text-sm">
          Lütfen eposta kutunuzu kontrol edin ve doğrulama mailini onaylayın
        </h1>
        <p className="text-xs">dogrulama yaptıysanız, sayfayı yenileyin..</p>
        <p></p>
        <button className="bg-indigo-600 w-full p-2 rounded-lg flex items-center justify-center">
          Gönder
        </button>
      </div>
      <div onClick={onSubmit}>profile</div>
    </div>
  );
};

export default EmailVerificationPage;
