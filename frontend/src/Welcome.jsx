import React, { useState } from 'react';
import SearchBar from './SearchBar.jsx';
import { useNavigate } from 'react-router-dom';


export default function Welcome(){
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const navigate = useNavigate();

  function handleClick(){
    navigate('/search', {
      state: {
        'jobTitle':jobTitle,
        'jobLocation':jobLocation,
        'redirected':'Welcome'
      }
    })
  }

  return (
    <>
      <div className='h-2/3 ml-[10dvw] flex justify-center flex-col gap-[5dvh]'>
        <p className='text-txt text-3xl'>Search jobs, directly fetched from company websites.</p>
        <div className='h-[30dvh]'>
          <SearchBar 
            jobTitle={jobTitle} 
            setJobTitle={setJobTitle}
            jobLocation={jobLocation}
            setJobLocation={setJobLocation}
            handleClick={handleClick}
          />
        </div>
      </div>
      <div className='h-1/3 ml-[10dvw] flex'>
        <div className="w-20 h-20 rounded-full border-4 border-red-400"></div>
        <div className="w-20 h-20 rounded-full border-4 border-red-300"></div>
        <div className="w-20 h-20 rounded-full border-4 border-red-200"></div>
        <div className="w-20 h-20 rounded-full border-4 border-red-100"></div>
      </div>
    </>
  );
}