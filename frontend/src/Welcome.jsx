import React, { useState } from 'react';
import SearchBar from './SearchBar.jsx';
import { useNavigate } from 'react-router-dom';
import { useCompanies } from './GlobalQueries.jsx';
import CompanyCollage from './CompanyCollage.jsx';


export default function Welcome(){
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const { loading, error, data } = useCompanies();
  const navigate = useNavigate();

  let companies = [];
  if (!loading && !error){
    companies = data.companies;
  }

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
      <div className='h-3/5 ml-[10dvw] flex justify-center flex-col gap-[5dvh]'>
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
      <div className='relative h-2/5 ml-[10dvw]'>
        <CompanyCollage companies={companies}/>
      </div>
    </>
  );
}
