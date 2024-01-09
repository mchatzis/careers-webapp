import React, { useContext, createContext } from 'react';
import { gql, useQuery } from '@apollo/client';


const GET_TITLES = gql`
    query QueryTitles{
        titles
    }
`;

const GET_LOCATIONS = gql`
    query QueryLocations{
        locations
    }
`;

const GET_COMPANIES = gql`
    query QueryCompanies{
        companies{
            id
            name
            url
        }
    }
`;

const TitlesResultContext = createContext({
    loading: true,
    error: null,
    data: undefined
});
export function useTitles(){
    return useContext(TitlesResultContext);
};

const LocationsResultContext = createContext({
    loading: true,
    error: null,
    data: undefined
});
export function useLocations(){
    return useContext(LocationsResultContext);
};

const CompaniesResultContext = createContext({
    loading: true,
    error: null,
    data: undefined
});
export function useCompanies(){
    return useContext(CompaniesResultContext);
};

export default function GlobalQueries({ children }){
    const titlesResults = useQuery(GET_TITLES);
    const locationResults = useQuery(GET_LOCATIONS);
    const companiesResults = useQuery(GET_COMPANIES);

    return (
        <TitlesResultContext.Provider value={titlesResults}>
            <LocationsResultContext.Provider value={locationResults}>
                <CompaniesResultContext.Provider value={companiesResults}>
                    {children}
                </CompaniesResultContext.Provider>
            </LocationsResultContext.Provider>
        </TitlesResultContext.Provider>
    )
}
