import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import axios from 'axios';
import './MovieList.css'
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store=>store.movies);
    const genres = useSelector(store=>store.genres);
    const history = useHistory();
    const [currentGenre, setCurrentGenre] = useState("Genre");

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({type: "FETCH_GENRES"});
    }, []);

    // Filters movies by genre
    const handleChange = (event) => {
        setCurrentGenre(event.target.value)
        if (event.target.value == "" || event.target.value == "all"){
            dispatch({ type: 'FETCH_MOVIES' });
        }
        else {
            axios.get(`/api/movie-genre/${event.target.value}`)
                .then((result) => {
                    dispatch({ type: 'SET_MOVIES', payload: result.data});
                })
                .catch((error) => {
                    console.error("Error in GET /api/movie-genre", error);
                    alert("Error in GET from 'api/movie-genre'. See console.");
                })
        }
    }
    
    return(
        <main>
            <h3>Filter by Genre:</h3>
            <Box sx={{ minWidth: 120 }}>
                <FormControl
                    sx={{
                        width:"300px",
                        backgroundColor:"whitesmoke",
                        border: "10px solid #F77F00",
                        color: "#003049"
                    }}
                >
                    <Select
                        value={currentGenre}
                        id="genre-select"
                        onChange={handleChange}
                    >
                        <MenuItem disabled value="Genre">
                            <em>Genre</em>
                        </MenuItem>
                        <MenuItem value={`all`}>All</MenuItem>
                        {genres.map(genre => {
                            return(
                                <MenuItem
                                    key={genre.id}
                                    value={genre.id}
                                >{`${genre.name}`}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Box>
            <hr></hr>
            <br></br>
            <div className='movies'>
                {movies.map(movie => {
                    return (
                        <Card 
                            onClick={()=>history.push(`/details/${movie.id}`)}
                            key={movie.id}
                            className="movie-list-card"
                            elevation={6}
                            sx={{ width: 220, backgroundColor: '#D62828' }}
                        >
                            <CardContent sx={{ height: 50} }>
                                <Typography sx={{fontSize: "1.25em", color:'white'}} className='movie-list-title'>{movie.title}</Typography>
                            </CardContent>
                            <CardMedia sx={{height: 300}}>
                                <img className="list-movie-poster" src={movie.poster} alt={movie.title}/>
                            </CardMedia>
                        </Card>
                    );
                })}
            </div>
        </main>
    );
}

export default MovieList;