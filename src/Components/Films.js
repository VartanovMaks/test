import React, { useEffect, useState } from 'react';
import FilmsList from './FilmsList';


function Films() {

    const [films, setFilms] = useState([])

    const fetchData = async () => {
        try{
            const response = await fetch('http://localhost:3000/films');
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