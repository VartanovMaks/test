import React, { useEffect, useState } from 'react';
import Poster from './Poster';

function Films() {

    const [film, setFilms] = useState(0)

    const fetchData = async () => {
        try{
            const response = await fetch('http://localhost:3000/films');
            const result = await response.json(response);
            setFilms(result);
            
    
        } catch (error) {
            console.log('Ошибка загрузки заданий', error);
        }
      }
    
    useEffect(()=>{
        fetchData()
    },[]);

    return (
        <div>
          {film && <div>
                        <p>{film.name}</p>
                        <p>{film.country}</p>
                        <Poster id = {film.id} poster = {film.poster} />
                    </div>     
            }
        </div>
    );
}

export default Films;