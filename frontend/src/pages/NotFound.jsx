import React from 'react';
import Navbar from '@/components/Navbar';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className='bg-black min-h-screen overflow-x-hidden text-4xl text-white'>
      <h1 className='pl-150 pt-60'>404 Page Not Found</h1>
      <button onClick={() => navigate('/')} className='cursor-pointer ml-175
       mt-10 border rounded-2xl px-6 py-2 hover:bg-white hover:text-black 
       transition-colors duration-250'>Home</button>
    </div>
    </>
  );
};

export default NotFound;
