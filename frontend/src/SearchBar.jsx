import React from 'react';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const jobTitleOptions = [
  'Software Engineer', 
  'Fullstack Engineer',
  'CEO',
  'Back-End engineer'
]

export default function SearchBar ({ handleClick }){
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (e) => {
      const value = e.target.value;
      setInputValue(value);

      // You can fetch suggestions from an API or use a predefined array here
      // For simplicity, let's assume we have a hardcoded array of suggestions
      const hardcodedSuggestions = ['Apple', 'Banana', 'Cherry', 'Durian'];
      const filteredSuggestions = hardcodedSuggestions.filter(suggestion =>
        suggestion.toLowerCase().startsWith(value.toLowerCase())
      );

      setSuggestions(filteredSuggestions);
    };

  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  
  function handleJobTitleChange(e){
    setJobTitle(e.target.value);
  }
  function handleJobLocationChange(e){
    setJobLocation(e.target.value)
  }
  console.log(suggestions)

  return (
    <>
      <div className='flex'>
        <input
          className="mr-2 h-[10dvh] w-[30dvw] border border-gray-300 rounded-md focus:outline-none  placeholder-gray-500 pl-3"
          type="text"
          value={jobTitle}
          placeholder='Job Title'
          list='jobTitleList'
          onFocus={(e) => e.target.setAttribute('placeholder', '')}
          onBlur={(e) => e.target.setAttribute('placeholder', 'Job Title')}
          onChange={handleJobTitleChange}
        />
        <datalist id='jobTitleList'>
          {jobTitleOptions.map((option, index) => <option key={index} value={option}/>)}
        </datalist>
        <input
          className="mr-2 h-[10dvh] w-[30dvw] border border-gray-300 rounded-md focus:outline-none  placeholder-gray-500 pl-3"
          type="text"
          value={jobLocation}
          placeholder="Location"
          onFocus={(e) => e.target.setAttribute('placeholder', '')}
          onBlur={(e) => e.target.setAttribute('placeholder', 'Location')}
          onChange={handleJobLocationChange}
        />
        <button 
          className="w-[8dvw] bg-detail text-black rounded-md hover:bg-detail2 focus:outline-none"
          onClick={handleClick}
        >
          Search
        </button>
      </div>
      <Dropdown>
        <Dropdown.Toggle>
          <Form.Control
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
        </Dropdown.Toggle>
        
        <Dropdown.Menu>
          {suggestions.map((suggestion, index) => (
            <Dropdown.Item key={index} onClick={() => setInputValue(suggestion)}>
              {suggestion}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
