import React from 'react';
import './Details.css';
import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Details(){
    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [currentMovie, setCurrentMovie] = useState({});

    const loadCurrentMovie = () => {
        axios.get(`/api/movie/${params.id}`).then((result) => {
            console.log(result.data);
            let tempMovie = {...result.data[0]};
            tempMovie.genre = [];
            for (let row of result.data){
                tempMovie.genre.push(row.genre);
            }
            console.log(tempMovie);
            setCurrentMovie(tempMovie);
        })
        .catch((error) => {
            console.error(`Error in GET 'api/movie/${params.id}`, error);
            alert("Something went wrong. Check console.");
        })
    }
    
    useEffect(() => {
        loadCurrentMovie();
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({type: "FETCH_GENRES"});
    }, []);

    return(
        <div id="details-div">
            <div className="row">
                <div className="column">
                    <h2 className="details-title">{currentMovie.title}</h2>
                    <br/>
                    <h5 className='details-subtitle'>Genres:</h5><p>{`${currentMovie.genre}`}</p>
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