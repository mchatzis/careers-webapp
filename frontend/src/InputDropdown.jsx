import React from 'react';
import { useState, useEffect } from 'react';
import DropDown from './Dropdown.jsx';


export default function InputDropdown({ placeholder, inputValue, setInputValue, suggestions }){
    const [focused, setFocused] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(()=>{
     setOptions(suggestions); 
    }, [suggestions])

    function handleInputChange(e){
        const value = e.target.value;
        setInputValue(value);
    
        let filteredSuggestions = suggestions;
  
        if (value.trim() !== "") {
          filteredSuggestions = suggestions.filter(suggestion => {
            return suggestion.toLowerCase().includes(value.toLowerCase());
          });
        }

        setOptions(filteredSuggestions);
    };

    function handleFocus(e){
      e.target.setAttribute('placeholder', '');
      setFocused(true);
    }

    function handleBlur(e){
      e.target.setAttribute('placeholder', placeholder)
      setFocused(false);
    }

    return(
        <div>
          <input
            className="mr-2 h-[10dvh] w-[30dvw] border border-gray-300 rounded-md focus:outline-none  placeholder-gray-500 pl-3"
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleInputChange}
          />
          {focused ? <DropDown options={options} setInputValue={setInputValue} /> : null}
        </div>
    )
}