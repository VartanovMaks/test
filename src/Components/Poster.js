import React from 'react';
import PATHTO from './Constants'

function Poster({id,poster}) {

    const url=`${PATHTO.HOST_NAME}/${id}/${PATHTO.POSTER}/${poster}`

    return (
        <div>
            <img src={url} alt={id}/>
        </div>
    );
}

export default Poster;