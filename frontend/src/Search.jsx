import React from 'react';
import SearchBar from './SearchBar.jsx';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


export default function Search(){
    const [jobTitle, setJobTitle] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const location = useLocation();

    useEffect(()=>{
        if (location.state.jobTitle && location.state.jobLocation){
            setJobTitle(location.state.jobTitle);
            setJobLocation(location.state.jobLocation);
        }
    }, [])

    return (
        <>
            <div className='h-1/3 ml-[10dvw] flex justify-center flex-col'>
                <SearchBar 
                    jobTitle={jobTitle} 
                    setJobTitle={setJobTitle}
                    jobLocation={jobLocation}
                    setJobLocation={setJobLocation}
                    handleClick={() => {}}
                />
            </div>
        </>
    );
}