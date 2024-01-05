import React from 'react';

function locationsToString(locations){
    let string = '';
    locations.forEach((location) => {
        string = string + location + ', '
    })
    string = string.substring(0, string.length - 2);

    return string;
}

export default function ResultsList({ jobs }){
    
    function handleClick(url){
        window.open(url, '_blank');
    }

    if (jobs.length === 0){
        return (
            <p className='text-txt text-xl'>No job matches were found.</p>
        )
    }

    return (
        <div className='h-full text-xl flex flex-col text-gray-700 bg-bgnd rounded-lg shadow overflow-y-scroll gap-2'>
            {jobs.map((job, index) => {
                console.log(job);

                const jobDisplay = {
                    title: job.title,
                    company: job.company.name,
                    locations: locationsToString(job.locations)
                }

                return (
                    <div 
                        key={index} 
                        className='flex justify-start items-center py-[7dvh] h-[20dvh] bg-white rounded-lg hover:bg-gray-200 hover:cursor-pointer p-3 mr-1 gap-[15dvw]'
                        onClick={() => window.open(job.company.url, '_blank')}
                    >
                        {Object.keys(jobDisplay).map((key)=>{
                            return (
                                <div className='w-[25dvw] whitespace-normal'>
                                    {jobDisplay[key]}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    )
}