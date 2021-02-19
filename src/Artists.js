import React from 'react';

// The component for the list of bands/artists
const Artists = ({artists=[]}) => {
  return (
    // create new div for each artist
    <>
      <div>
        { artists.map((data,index) => {
            if (data) {
              return (
                <div key={index} style={{marginLeft: 'auto', marginRight: 'auto', width: 406, border: '.5px solid #D1D1D1', borderRadius: 2, }}>
                  <h1>{data}</h1>
    	           </div>
        	   )
        	 }
        	 return null
        }) }
      </div>
    </>
  );
}

export default Artists
