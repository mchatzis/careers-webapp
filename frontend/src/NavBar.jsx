import React from "react";
import { useNavigate } from "react-router-dom";


export default function NavBar({ setDisplay }){
    const navigate = useNavigate();
    
    const pageMapping = {
        'Home':'/',
        'Search':'/search',
        'About':'/about'
    }

    function handleClick(route){
        navigate(route);
        setDisplay(false);
    }
      
    return (
        <ul className="absolute w-full text-center p-5">
            {Object.keys(pageMapping).map((key)=>{
                return (
                    <li 
                        className="h-10 border border-detail2 text-xl font-bold text-detail2 cursor-pointer hover:bg-detail2 hover:text-black"
                        onClick={() => handleClick(pageMapping[key])}
                        key={key}
                    >
                        {key}
                    </li>
                )
            })}
        </ul>
    );
};