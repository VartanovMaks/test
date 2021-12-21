import React from 'react';
import Poster from './Poster';
import {Link} from 'react-router-dom'


function FilmsList({films}) {
    console.log("FilmsList", films);
    return (
        <>
            <div className="film-list">
                {!!films && films.map(film => 
                    <div className="film" key={film._id}>
                        <p>{film.name}</p>
                        <p>{film.country}</p>
                        <Poster id = {film._id} poster = {film.poster} />
                        <Link to={`/films/${film._id}`} >
                            <button> Подробнее </button>
                        </Link>
                    </div>   
                )}
            </div>
        </>
    );
}

export default FilmsList;