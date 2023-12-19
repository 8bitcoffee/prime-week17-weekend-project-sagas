import React from 'react';
import './Details.css';
import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';

function Details(){
    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [currentMovie, setCurrentMovie] = useState({});

    // Gets specific movie from details
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
                        onClick={() => history.push('/')}
                        sx={{
                            backgroundColor:"#003049",
                            marginBottom:"10px",
                            ":hover":{
                                backgroundColor:"#D62828"
                            }
                        }}
                    >Back</Button>
                </div>
            </div>
        </Card>
    )
}

export default Details;