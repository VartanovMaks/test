import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import PATHTO from './Constants';

function Film(params) {
    
    const [film, setFilm] = useState(0)
    const {filmID}  = useParams();

    const fetchData = async () => {
        try{
            const response = await fetch(`${PATHTO.HOST_NAME}/films/${filmID}`);
            const result = await response.json();
            setFilm(result);
        } catch (error) {
            console.log('Ошибка загрузки фильма', error);
        }
    }
    
    useEffect(()=>{
        fetchData();
    },[]);
    
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
                                <img src={`${PATHTO.HOST_NAME}/${film._id}/${PATHTO.ACTORS_PHOTO}/${actor.photo}`} alt={actor.name} />
                                <p>{actor.name}</p>
                            </div>
                    )}  
                </div>
                <iframe width="560" height="315" src={`${film.trailer}`}
                        title="YouTube video player" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                </iframe>
                
            </>}
        </div>
    );
}

export default Film;