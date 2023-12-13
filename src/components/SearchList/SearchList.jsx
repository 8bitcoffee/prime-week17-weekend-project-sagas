import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
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
    const addToLibrary = (movie) => {
        
    }

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
                            onClick={()=>history.push(`/searchdetails/${movie.id}`)}
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

export default SearchList;