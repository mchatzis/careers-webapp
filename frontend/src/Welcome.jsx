import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar.jsx';
import { useNavigate } from 'react-router-dom';
import CompanyCollage from './CompanyCollage.jsx';
import { gql, useLazyQuery } from '@apollo/client';


export default function Welcome(){
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [getCompanies, {loading, error, data}] = useLazyQuery(GET_COMPANIES);

  useEffect(()=>{
    getCompanies();
  }, [])

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
        {data ? <CompanyCollage companies={data.companies}/> : null}
      </div>
    </>
  );
}


const GET_COMPANIES = gql`
    query QueryCompanies{
        companies{
            id
            name
            url
        }
    }
`;