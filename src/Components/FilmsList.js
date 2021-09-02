import React from 'react';
import Poster from './Poster';
import {Link} from 'react-router-dom'

function FilmsList({films}) {
    
    return (
        <div className="film-list">
            {films.map(film => 
                <div className="film">
                    <p>{film.name}</p>
                    <p>{film.country}</p>
                    <Poster id = {film.id} poster = {film.poster} />
                    <Link to={`/films/${film.id}`} >
                        <button> Подробнее </button>
                    </Link>
                </div>   
            )}
        </div>
    );
}

export default FilmsList;