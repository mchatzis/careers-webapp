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

const TitlesResultContext = createContext({
    loading: true,
    error: null,
    data: undefined
})
export function useTitles(){
    return useContext(TitlesResultContext);
}

const LocationsResultContext = createContext({
    loading: true,
    error: null,
    data: undefined
})
export function useLocations(){
    return useContext(LocationsResultContext);
}

export default function GlobalQueries({ children }){
    const titlesResults = useQuery(GET_TITLES);
    const locationResults = useQuery(GET_LOCATIONS);

    return (
        <TitlesResultContext.Provider value={titlesResults}>
            <LocationsResultContext.Provider value={locationResults}>
                {children}
            </LocationsResultContext.Provider>
        </TitlesResultContext.Provider>
    )
}
