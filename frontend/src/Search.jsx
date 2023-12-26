import React from 'react';
import SearchBar from './SearchBar.jsx';


export default function Search( {setIsSearching} ){
    return (
        <>
            <div className='h-1/5'>
                <SearchBar />
            </div>
        </>
    );
}