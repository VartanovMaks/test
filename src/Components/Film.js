import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import PATHTO from './Constants';
import Player from './Player';


function Film(params) {
    
    const [film, setFilm] = useState(0)
    const {filmID}  = useParams();
    const [isFilmViewed, setIsFilmViewed] = useState(0);

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
    
    console.log(film);
    return (
        <div className={"film-details"}>
            { film && 
            <>
                <h3>{film.name}</h3>
                <p>Год выпуска: {film.year}, страна: {film.country}, жанр: {film.category}</p>
                <p>Режиссер: {film.director.name}</p>
                <h5>Актеры</h5>
                <div className="film-list">
                    {film.images.map(img => 
                            <div key={img}>
                                <img src={`${PATHTO.HOST_NAME}/${film._id}/${PATHTO.FRAMES}/${img}`} alt={img} />
                            </div>
                    )}  
                </div>
                <div className="film-list">
                    {film.actors.map(actor => 
                            <div key={actor.name}>
                                <img src={`${PATHTO.HOST_NAME}/${film._id}/${PATHTO.ACTORS_PHOTO}/${actor.photo}`} alt={actor.name} />
                                <p>{actor.name}</p>
                            </div>
                    )}  
                </div>
                {film.trailer && <Player videoUrl={film.trailer} isViewed = {setIsFilmViewed}/>
                 }
                {/* {film.trailer && <iframe width="560" height="315" src={`${film.trailer}`}
                        title="YouTube video player" frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                </iframe>
                 } */}
            </>}
        </div>
    );
}

export default Film;