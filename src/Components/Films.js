import React, { useEffect, useState } from 'react';
import FilmsList from './FilmsList';
import PATHTO from './Constants'


function Films() {

    const [films, setFilms] = useState([])

    const fetchData = async () => {
        try{
            const response = await fetch(`${PATHTO.HOST_NAME}/films`);
            const result = await response.json();
            setFilms(result);
        } catch (error) {
            console.log('Ошибка загрузки заданий', error);
        }
      }
    
    useEffect(()=>{
        fetchData()
    },[]);

    return (
        <>
        {films && <FilmsList films={films}/>}
        </>
    );
}

export default Films;