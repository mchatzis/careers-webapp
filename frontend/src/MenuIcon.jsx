import React from "react";


export default function MenuIcon({ setDisplay }){
    return (
        <div 
            className="absolute h-8 w-10 flex flex-col justify-between right-0 top-0 cursor-pointer"
            onClick={() => setDisplay(true)}
        >
            <div className="h-1 bg-detail2"></div>
            <div className="h-1 bg-detail2"></div>
            <div className="h-1 bg-detail2"></div>
        </div>
    )
}
