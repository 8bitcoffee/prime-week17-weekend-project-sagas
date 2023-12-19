import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import axios from 'axios';
import './SearchList.css'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import QueueSharpIcon from '@mui/icons-material/QueueSharp';

function SearchList(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const apiKey = process.env.REACT_APP_API_KEY;

    // Adds movie to library. Sends details to saga processNewMovie()
    const addToLibrary = (TMDB_id) => {
        // Querry the API for full details of the movie
        axios.get(`https://api.themoviedb.org/3/movie/${TMDB_id}?api_key=${apiKey}`)
            .then((response) => {
                let tempMovie = {
                    title: response.data.title,
                    description: response.data.overview,
                    poster: `https://image.tmdb.org/t/p/original${response.data.poster_path}`
                };

                tempMovie.genre = [];

                // Adds just the genre names to the array instead of including TMDB genre ids
                for (let genre of response.data.genres){
                    tempMovie.genre.push(genre.name);
                }

                dispatch({
                    type: "PROCESS_NEW_MOVIE",
                    payload: tempMovie
                })
            })
            .catch((error) => {
                console.error(`Error in GET from TMDB`, error);
                alert("Something went wrong. Check console.");
            })
        ;
    }

    // Get updated library and genre info on refresh
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({type: "FETCH_GENRES"});
    }, []);
    
    
    return(
        <main>
            <div className='movies'>
                {props.movies.map(movie => {
                    return (
                        <Card 
                            key={movie.id}
                            className="movie-list-card"
                            elevation={6}
                            sx={{ width: 220, backgroundColor: '#D62828' }}
                        >
                            <CardContent sx={{ height: 50} }>
                                <Typography 
                                    onClick={()=>history.push(`/searchdetails/${movie.id}`)}
                                    sx={{fontSize: "1.25em", color:'white'}} className='movie-list-title'
                                >{movie.title}</Typography>
                            </CardContent>
                            <CardMedia 
                                sx={{height: 300}}
                                onClick={()=>history.push(`/searchdetails/${movie.id}`)}
                            >
                                <img className="list-movie-poster" src={movie.poster} alt={movie.title}/>
                            </CardMedia>
                            <CardActions sx={{height: 50}}>
                                <Button 
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#003049",
                                        ":hover":{backgroundColor:"#D62828"},
                                        border:"5px solid #F77F00"
                                    }}
                                    onClick={()=>addToLibrary(movie.id)}
                                >
                                    <QueueSharpIcon
                                        className='header-icon'
                                        variant="sharp"
                                        fontSize='large'
                                        sx={{
                                            color:"whitesmoke",
                                            ":hover": {
                                                color: "#003049"
                                            }
                                        }}
                                    />
                                    Add to Library
                                </Button>
                            </CardActions>
                        </Card>
                    );
                })}
            </div>
        </main>
    )
}

export default SearchList;