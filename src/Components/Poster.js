import React from 'react';

function Poster({id,poster}) {

    const url=`http://localhost:3000/${id}/poster/${poster}`
    console.log(url)

    return (
        <div>
            <img src={url} alt="dfdf"/>

            {/* <img src="http://localhost:3000/0/poster/47metersdownuncaged.webp" alt="dfdf"/> */}
        </div>
    );
}

export default Poster;