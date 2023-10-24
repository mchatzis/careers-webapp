import './main.css';
import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_COMPANIES = gql`
    query GetCompanies {
    companies {
        name
        industry
    }
    }
`;

export default function App(){
    const { loading, error, data } = useQuery(GET_COMPANIES);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <>
            <p className='font-bold text-gray-500'>Hello World!</p>
            <ul>
                {data.companies.map(({name, industry}) => {
                    return (
                            <li key={name}>
                                {name}, {industry}
                            </li>
                        );
                    })
                }
            </ul>
        </>
    );
};