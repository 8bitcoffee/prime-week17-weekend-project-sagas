import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './MovieList.css'

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({type: "FETCH_GENRES"});
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            {/* Update this with MUI cards */}
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3 onClick={()=>history.push(`/details/${movie.id}`)}>{movie.title}</h3>
                            <img onClick={()=>history.push(`/details/${movie.id}`)} src={movie.poster} alt={movie.title}/>
                        </div>
                    );
                })}
            </section>
            {/* End MUI */}
        </main>

    );
}

export default MovieList;