import React from 'react';
import './SearchBox.css'
const SearchBox = ({searchfield, searchChange}) => {
    return (
        <div className='searchinput'>
        <input className ='search-input' 
        type='search' 
        placeholder='Search To Do' 
        onChange = {searchChange}
        />    
        </div>
    );
}
export default SearchBox;