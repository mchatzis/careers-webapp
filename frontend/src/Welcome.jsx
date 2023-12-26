import React from 'react';
import SearchBar from './SearchBar.jsx';

export default function Welcome({ setIsSearching }){

  return (
    <>
      <div className='h-2/3'>
        <div className='h-full ml-[10dvw] flex justify-center flex-col gap-[5dvh]'>
          <p className='text-txt text-3xl'>Search jobs, directly fetched from company websites.</p>
          <SearchBar setIsSearching={setIsSearching}/>
        </div>
      </div>
      <div className='h-1/3'>
        <div className='ml-[10dvw] flex'>
          <div className="w-20 h-20 rounded-full border-4 border-red-400"></div>
          <div className="w-20 h-20 rounded-full border-4 border-red-300"></div>
          <div className="w-20 h-20 rounded-full border-4 border-red-200"></div>
          <div className="w-20 h-20 rounded-full border-4 border-red-100"></div>
        </div>
      </div>
    </>
  );
}
