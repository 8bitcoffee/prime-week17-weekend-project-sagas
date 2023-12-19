import React, { useState, useEffect } from 'react';
import './AddMovie.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchList from '../SearchList/SearchList';

function AddMovie(){
    const dispatch = useDispatch();
    const apiKey = process.env.REACT_APP_API_KEY; // From TMDB API
    const [searchTerm, setSearchTerm] = useState(""); // Search term for API query
    const searchResults = useSelector(store=>store.searchResults); // Search response
    const movies = useSelector(store=>store.movies); // Current movie library

    // If there hasn't been a search, display the current library
    if (searchResults.length == 0){
        dispatch({
            type: "SET_SEARCH_RESULTS",
            payload: movies
        })
    }

    // API query. Saves the result in the searchResults reducer
    const handleSubmit = (e) => {
        e.preventDefault();

        let url = `https://api.themoviedb.org/3/search/movie?query=${encodeURI(searchTerm)}&api_key=${apiKey}`;
        axios.get(url)
            .then((response) => {
                let filteredArray = [];
                for (let movie of response.data.results){
                    let formattedMovie = {};
                    if (movie.poster_path != null){
                        formattedMovie.title = movie.title;
                        formattedMovie.description = movie.overview;
                        formattedMovie.poster = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
                        formattedMovie.id = movie.id;
                        filteredArray.push(formattedMovie);
                    }
                }
                dispatch({
                    type: "SET_SEARCH_RESULTS",
                    payload: filteredArray
                })
                console.log(response.data);
                setSearchTerm("");
            })
            .catch((error) => {
                console.error("Error in API fetch", error);
                alert("Error in search");
            })
        ;
    }

    // Clears search results and displays library instead
    const clearSearchResults = () =>{
        dispatch({
            type: "SET_SEARCH_RESULTS",
            payload: movies
        });
        setSearchTerm("");
    }

    // Get updated library and genre info on refresh
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({ type: "FETCH_GENRES"});
    }, []);

    return(
        <div>
            <form onSubmit={()=>handleSubmit(event)} id="add-movie-form">
                <TextField
                    size='small'
                    variant='filled'
                    value={searchTerm} 
                    onChange={event=>setSearchTerm(event.target.value)} 
                    type="text" 
                    placeholder="Search for a new movie" id="movie-searchbox"
                    sx={{
                        backgroundColor:"whitesmoke",
                        width: "300px",
                        textAlign: "center",
                        border:"5px solid #F77F00",
                        resize:"both",
                        marginTop:"5px",
                        marginBottom:"5px",
                    }}
                />
                <Button
                    id="search-submit-btn" 
                    variant="contained" 
                    type='submit'
                    sx={{
                        backgroundColor: "whitesmoke",
                        ":hover":{backgroundColor:"#D62828", color:"whitesmoke"},
                        height:"40px",
                        marginLeft:"15px",
                        marginTop:"10px",
                        marginBottom: "10px",
                        border:"2px solid #003049",
                        color:"#003049"
                    }}
                >Search</Button>
                <Button
                    id="clear-search-btn" 
                    variant="contained"
                    onClick={()=>clearSearchResults()}
                    sx={{
                        backgroundColor: "whitesmoke",
                        ":hover":{backgroundColor:"#D62828", color:"whitesmoke"},
                        height:"40px",
                        marginLeft:"15px",
                        marginTop:"10px",
                        marginBottom: "10px",
                        border:"2px solid #003049",
                        color:"#003049"
                    }}
                >Clear Results</Button>
            </form>
            <SearchList movies={searchResults}/>
        </div>
    )
}

export default AddMovie;