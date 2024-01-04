import React from 'react';


export default function DropDown({ options, setInputValue }){
    return (
        <div>
            <ul className='w-[30dvw] h-[21dvh] text-sm text-gray-700 bg-white rounded-lg shadow overflow-y-scroll'>
                {options.map((option, index) => {
                    return (
                        <li 
                            key={index}
                            className='block px-4 py-2 hover:bg-gray-200'
                            onMouseDown={() =>setInputValue(option)}
                        >{option}</li>
                    );
                })}
            </ul>
        </div>
    )
}