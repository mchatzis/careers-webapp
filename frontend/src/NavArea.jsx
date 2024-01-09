import React, { useState } from "react";
import MenuIcon from "./MenuIcon.jsx";
import NavBar from "./NavBar.jsx";


export default function NavArea(){
    const [display, setDisplay] = useState(false);

    return (
        <div 
            className="absolute right-10 top-10 h-[25dvh] w-[17dvw]"
            onMouseLeave={() => setDisplay(false)}
        >
            {display ? <NavBar setDisplay={setDisplay}/> :<MenuIcon setDisplay={setDisplay}/>}
        </div>
    );
}