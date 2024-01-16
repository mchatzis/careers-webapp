import React from 'react';
import SearchBar from './SearchBar.jsx';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/client';
import ResultsList from './ResultsList.jsx';

export default function Search(){
    const [jobTitle, setJobTitle] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const [getJobs, { loading, error, data, fetchMore }] = useLazyQuery(GET_JOBS, {
        variables:{
            offset:0
        }
    });
    const location = useLocation();

    useEffect(()=>{
        if (location.state){
            setJobTitle(location.state.jobTitle);
            setJobLocation(location.state.jobLocation);
            getJobs({ variables: { title:location.state.jobTitle, location:location.state.jobLocation } })
        }
    }, [])

    useEffect(()=>{
        if (loading){
            document.body.classList.add('waiting');
        }
        else {
            document.body.classList.remove('waiting');
        }
    },[loading])


    if (error){
        return (
            <p className='text-txt text-xl'>Error: {error.message}</p>
        )
    }
    return (
        <>
            <div className='h-full flex flex-col justify-around items-start ml-[4dvw]'>
                <div className='h-[10dvh]'>
                    <SearchBar 
                        jobTitle={jobTitle} 
                        setJobTitle={setJobTitle}
                        jobLocation={jobLocation}
                        setJobLocation={setJobLocation}
                        handleClick={() => getJobs({ variables: {title:jobTitle, location:jobLocation} })}
                    />
                </div>
                <div id='scrollable' className='h-[75dvh] w-[90dvw] overflow-y-scroll'>
                    {data ? <ResultsList jobs={data.jobs} fetchMore={fetchMore}/> : null}
                </div>
            </div>
        </>
    );
}

const GET_JOBS = gql`
    query QueryJobs($title: String, $location: String, $offset: Int) {
        jobs(title: $title, location: $location, offset: $offset) {
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