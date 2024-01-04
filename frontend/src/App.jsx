import './main.css';
import React from 'react';
import Welcome from './Welcome.jsx';
import Search from './Search.jsx';
import { Routes, Route } from "react-router-dom";


export default function App(){    
    return (
        <div className='h-screen bg-bgnd'>
            <Routes>
                <Route path="/" element={ <Welcome /> } />
                <Route path="search" element={ <Search /> } />
            </Routes>
        </div>
    );
};