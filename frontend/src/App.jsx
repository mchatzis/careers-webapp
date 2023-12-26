import './main.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState } from 'react';
import Welcome from './Welcome.jsx';
import Search from './Search.jsx';


export default function App(){
    const [isSearching, setIsSearching] = useState(false);


    return (
        <div className='h-screen bg-bgnd'>
            {isSearching ? <Search /> : <Welcome setIsSearching={setIsSearching}/>}
        </div>
    );
};