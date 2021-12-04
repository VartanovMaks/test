import React, { useEffect, useState } from 'react';

function Preview({preview}) {
    
    const [source, setSource] = useState([]);
    
    useEffect(()=>{
        
        if(preview){
            const reader = new FileReader();
            reader.onloadend = () => {
                setSource(reader.result);
            };
            reader.readAsDataURL(preview);
        }
            
    },[preview]);
    return (
        <div>
            {source && <img src={source} alt={''} />}
        </div>
    );
}

export default Preview;