import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './MovieList.css'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import QueueSharpIcon from '@mui/icons-material/QueueSharp';


function MovieList(props) {

    const dispatch = useDispatch();
    const movies = props.movies;
    const history = useHistory();

    const addToLibrary = () => {

    }

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({type: "FETCH_GENRES"});
    }, []);
    
    if (props.search == true){
        return(
            <main>
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
                                <CardActions sx={{height: 50}}>
                                    <Button 
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#003049",
                                            ":hover":{backgroundColor:"#D62828"},
                                            border:"5px solid #F77F00"
                                        }}
                                        onClick={()=>addToLibrary(movie)}
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
    else {
        return(
            <main>
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
}

export default MovieList;