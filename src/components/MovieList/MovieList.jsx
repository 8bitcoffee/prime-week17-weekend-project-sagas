import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './MovieList.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({type: "FETCH_GENRES"});
    }, []);
    
    return(
        <main>
            {/* Update this with MUI cards */}
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
            {/* End MUI */}
        </main>
    )
}

export default MovieList;