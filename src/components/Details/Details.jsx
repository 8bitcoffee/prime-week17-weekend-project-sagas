import React from 'react';
import './Details.css';
import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function Details(){
    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const movieDetails = useSelector(store => store.movieDetails);
    const [currentMovie, setCurrentMovie] = useState({});


    const loadCurrentMovie = () => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({type: "FETCH_GENRES"});
        dispatch({
            type: "FETCH_MOVIE_DETAILS",
            payload: {id: params.id}
        });
        let tempMovie = {};
        for (let movie of movies){
            if (movie.id == params.id){
                tempMovie = {...movie, genre: movieDetails};
            }
        } 
        setCurrentMovie(tempMovie);
    }
    
    useEffect(() => {
        loadCurrentMovie();
    }, []);

    return(
        <div id="details-div">
            <div className="row">
                <div className="column">
                    <h2 className="details-title">{currentMovie.title}</h2>
                    <br/>
                    <h5 className='details-subtitle'>Genres:</h5><p>{`${movieDetails}`}</p>
                    <h5 className='details-subtitle'>Description : </h5><p>{`${currentMovie.description}`}</p>
                    <br/>
                    <button className="details-btn" onClick={() => history.push('/')}>Back</button>
                </div>
                <div>
                    <img className="details-img" src={`${currentMovie.poster}`} alt="Movie poster"/>
                </div>
                
            </div>
        </div>
    )
}

export default Details;