import React from 'react';
import './SearchDetails.css';
import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';

function SearchDetails(){
    const params = useParams();
    const apiKey = process.env.REACT_APP_API_KEY;
    const history = useHistory();
    const dispatch = useDispatch();
    const [currentMovie, setCurrentMovie] = useState({});
    const genres = useSelector(store=>store.genres);

    const loadCurrentMovie = () => {
        axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${apiKey}`)
            .then((response) => {
                console.log(response.data);
                let tempMovie = {
                    title: response.data.title,
                    description: response.data.overview,
                    poster: `https://image.tmdb.org/t/p/original${response.data.poster_path}`
                };
                tempMovie.genre = [];
                for (let genre of response.data.genres){
                    tempMovie.genre.push(genre.name);
                }
                console.log(tempMovie);
                setCurrentMovie(tempMovie);
            })
            .catch((error) => {
                console.error(`Error in GET from TMDB`, error);
                alert("Something went wrong. Check console.");
            })
        ;
    }

    const addToLibrary = (movie) => {
        dispatch({
            type: "PROCESS_NEW_MOVIE",
            payload: movie
        })
    }
    
    useEffect(() => {
        loadCurrentMovie();
        dispatch({type: "FETCH_GENRES"});
    }, []);

    return(
        <Card id="details-div" elevation={8} sx={{marginRight:"10px", marginLeft:"10px"}}>
            <div className="row">
                <div className="column">
                    <img className="details-img" src={`${currentMovie.poster}`} alt="Movie poster"/>
                </div>
                <div className='column-right'>
                    <h2 className="details-title">{currentMovie.title}</h2>
                    <h5 className='details-subtitle'>Genres:</h5><p>{`${currentMovie.genre}`}</p>
                    <h5 className='details-subtitle'>Description : </h5><p>{`${currentMovie.description}`}</p>
                    <Button 
                        variant="contained" 
                        className="details-btn"
                        onClick={() => history.push('/add')}
                        sx={{
                            backgroundColor:"#003049",
                            marginBottom:"10px",
                            ":hover":{
                                backgroundColor:"#D62828"
                            }
                        }}
                    >Back</Button>
                    <Button 
                        variant="contained" 
                        className="details-btn"
                        onClick={() => addToLibrary(currentMovie)}
                        sx={{
                            backgroundColor:"#003049",
                            marginBottom:"10px",
                            marginLeft:"10px",
                            ":hover":{
                                backgroundColor:"#D62828"
                            }
                        }}
                    >Add to Library</Button>
                </div>
            </div>
        </Card>
    )
}

export default SearchDetails;