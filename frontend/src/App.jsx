import './main.css';
import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_JOBS = gql`
    query QueryJobs($title: String, $location: String) {
        jobs(title: $title, location: $location) {
            id
            title
            location
            dateAdded
            company {
                id
                name
            }
        }
    }
`;

export default function App(){
    const title = "cfo";
    const location = "Madrid";
    const { loading, error, data } = useQuery(GET_JOBS, {
        variables: {title, location}
    });


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <>
            <p className='font-bold text-gray-500'>Hello World!</p>
            <ul>
                {data.jobs.map(({id, title}) => {
                    return (
                            <li key={id}>
                                {id}, {title}
                            </li>
                        );
                    })
                }
            </ul>
        </>
    );
};