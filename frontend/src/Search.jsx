import React from 'react';
import SearchBar from './SearchBar.jsx';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/client';
import ResultsList from './ResultsList.jsx';


const GET_JOBS = gql`
    query QueryJobs($title: String, $location: String) {
        jobs(title: $title, location: $location) {
            id
            title
            locations
            dateAdded
            company {
                id
                name
                url
            }
        }
    }
`;

export default function Search(){
    const [jobTitle, setJobTitle] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const [getJobs, { loading, error, data }] = useLazyQuery(GET_JOBS);
    const location = useLocation();

    useEffect(()=>{
        if (location.state.jobTitle || location.state.jobLocation){
            setJobTitle(location.state.jobTitle);
            setJobLocation(location.state.jobLocation);
            getJobs({ variables: { title:location.state.jobTitle, location:location.state.jobLocation } })
        }
    }, [])

    return (
        <>
            <div className='h-full flex flex-col justify-around items-center'>
                <div className='h-[10dvh]'>
                    <SearchBar 
                        jobTitle={jobTitle} 
                        setJobTitle={setJobTitle}
                        jobLocation={jobLocation}
                        setJobLocation={setJobLocation}
                        handleClick={() => getJobs({ variables: { title:jobTitle, location:jobLocation } })}
                    />
                </div>
                <div className='h-[75dvh] w-[90dvw]'>
                    {data ? <ResultsList jobs={data.jobs}/> : null}
                </div>
            </div>
        </>
    );
}