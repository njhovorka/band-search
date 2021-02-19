import React from 'react';

// The component for the actual search bar.
const SearchBar = ({input:keyword, onChange:setKeyword}) => {
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem", outlineColor: '#b91c1c'};
  return (
    <input
     style={BarStyling}
     key="random1"
     value={keyword}
     placeholder={"search artists..."}
     onChange={(e) => {setKeyword(e.target.value)}}
    />
  );
}

export default SearchBar
