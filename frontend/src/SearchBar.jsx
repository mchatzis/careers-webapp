import React from 'react';

export default function SearchBar ({ setIsSearching }){

  return (
    <div className='flex'>
      <input
        className="mr-2 h-[10dvh] w-[30dvw] border border-gray-300 rounded-md focus:outline-none  placeholder-gray-500 pl-3"
        type="text"
        placeholder="Job Title"
        onFocus={(e) => e.target.setAttribute('placeholder', '')}
        onBlur={(e) => e.target.setAttribute('placeholder', 'Job Title')}
      />
      <input
        className="mr-2 h-[10dvh] w-[30dvw] border border-gray-300 rounded-md focus:outline-none  placeholder-gray-500 pl-3"
        type="text"
        placeholder="Location"
        onFocus={(e) => e.target.setAttribute('placeholder', '')}
        onBlur={(e) => e.target.setAttribute('placeholder', 'Location')}
      />
      <button 
        className="w-[8dvw] bg-detail text-black rounded-md hover:bg-detail2 focus:outline-none"
        onClick={() => setIsSearching(true)}
      >
        Search
      </button>
    </div>
  );
};
