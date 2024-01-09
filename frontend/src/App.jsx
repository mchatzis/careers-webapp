import './main.css';
import React from 'react';
import Welcome from './Welcome.jsx';
import Search from './Search.jsx';
import { Routes, Route } from "react-router-dom";
import NavArea from './NavArea.jsx';
import About from './About.jsx';


export default function App(){    
    return (
        <div className='h-screen bg-bgnd'>
            <NavArea />
            <Routes>
                <Route path="/" element={ <Welcome /> } />
                <Route path="search" element={ <Search /> } />
                <Route path="about" element= { <About /> } />
            </Routes>
        </div>
    );
};