import React from 'react';
import {ItemsPerPage} from '../Constants'

function PagesNumber({setItemsOnPage}) {
    
    const onSelectPages=(e)=>{
        setItemsOnPage(e.target.value);
    }
    return (
            <select>
                {ItemsPerPage.map(item=>
                <option onClick={onSelectPages}>{item}</option>
                    )}
            </select>
    );
}

export default PagesNumber;