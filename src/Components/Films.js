import React, { useEffect, useState } from 'react';
import FilmsList from './FilmsList';
import PATHTO from './Constants';
import Pagination from './Pagination/Pagination.jsx';


function Films() {
    const [films, setFilms] = useState([]);
    // const [isFetching, setIsFetching]= useState(false);
    const itemsOnPage = 4;
    const [fetchParams, setFetchParams] = useState({
        limit: itemsOnPage,
        skip:0,
    })
    
    const fetchData = async (url) => {
        try{
            const response = await fetch(url);
            const result = await response.json();
            setFilms(result);
        } catch (error) {
            console.log('Ошибка загрузки заданий', error);
        }
    }
    
    useEffect(()=>{
        const url = `${PATHTO.HOST_NAME}/films?skip=${fetchParams.skip}&limit=${fetchParams.limit}`;
        fetchData(url);
    },[fetchParams, itemsOnPage]);
    
    return (
        <>
            <Pagination 
                setFetchData={setFetchParams}
                itemsOnPage={itemsOnPage}
            />
            {!!films && <FilmsList films={films}/>}
        </>
    );
}

export default Films;