import React from 'react';
import InputDropdown from './InputDropdown.jsx';
import { useTitles, useLocations } from './GlobalQueries.jsx';


export default function SearchBar ({ jobTitle, setJobTitle, jobLocation, setJobLocation, handleClick }){

  // Fetch possible titles and locations
  const titlesData = useTitles();
  const locationsData = useLocations();

  let titleSuggestions = [];
  if (!titlesData.loading && !titlesData.error){
    titleSuggestions = titlesData.data.titles;
  }

  let locationSuggestions = [];
  if (!locationsData.loading && !locationsData.error){
    locationSuggestions = locationsData.data.locations;
  }

  return (
    <>
      <div className='flex h-full'>
        <InputDropdown 
          placeholder={'Job Title'} 
          inputValue={jobTitle} 
          setInputValue={setJobTitle}
          suggestions={titleSuggestions}
        />
        <InputDropdown 
          placeholder={'Location'} 
          inputValue={jobLocation} 
          setInputValue={setJobLocation}
          suggestions={locationSuggestions}
        />
        <button 
          className="w-[8dvw] h-[10dvh] bg-detail text-black rounded-md hover:bg-detail2 focus:outline-none"
          onClick={handleClick}
        >Search</button>
      </div>
    </>
  );
};
