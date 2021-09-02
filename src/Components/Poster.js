import React from 'react';

function Poster({id,poster}) {

    const url=`http://localhost:3000/${id}/poster/${poster}`

    return (
        <div>
            <img src={url} alt={id}/>
        </div>
    );
}

export default Poster;