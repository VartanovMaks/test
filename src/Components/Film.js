import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

function Film(params) {
    
    const [film, setFilm] = useState(0)
    const {filmID}  = useParams();

    const fetchData = async () => {
        try{
            const response = await fetch(`http://localhost:3000/films/${filmID}`);
            const result = await response.json();
            setFilm(result);
        } catch (error) {
            console.log('Ошибка загрузки фильма', error);
        }
    }
    
    useEffect(()=>{
        fetchData();
    },[]);
    
    console.log(film);
    
    return (
        <div className={"film-details"}>
            { film && <>
                <h3>{film.name}</h3>
                <p>Год выпуска: {film.year}, страна: {film.country}, жанр: {film.category}</p>
                <p>Режиссер: {film.director.name}</p>
                <h5>Актеры</h5>
                <div className="film-list">
                    {film.actors.map(actor => 
                            <div>
                                <img src={`http://localhost:3000/${film.id}/actors_img/${actor.photo}`} alt={actor.name} />
                                <p>{actor.name}</p>
                            </div>
                    )}  
                </div>
            </>}
        </div>
    );
}

export default Film;