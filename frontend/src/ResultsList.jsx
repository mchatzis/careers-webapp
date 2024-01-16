import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Job from './Job.jsx';

export default function ResultsList({ jobs, fetchMore }){
    if (jobs.length === 0){
        return (
            <p className='text-txt text-xl'>No job matches were found.</p>
        )
    }

    const jobsList = jobs.map((job, index) => (
            <Job index={index}
                 job={{ title: job.title,
                        company: job.company.name,
                        locations: locationsToString(job.locations)}}
                 url={job.company.url}
                />
            ));

    return (
            <InfiniteScroll
                dataLength={jobs.length}
                next={() => fetchMore({
                    variables:{
                        offset:jobs.length
                    }
                })}
                hasMore={true}
                className='text-xl flex flex-col text-gray-700 bg-bgnd rounded-lg shadow gap-2'
                scrollableTarget='scrollable'
            >
                {jobsList}
            </InfiniteScroll> 
    )
}

function locationsToString(locations){
    let string = '';
    locations.forEach((location) => {
        string = string + location + ', '
    })
    string = string.substring(0, string.length - 2);

    return string;
}