import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider, useSelector, useStore } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery("FETCH_GENRES", fetchGenres);
    yield takeEvery("FETCH_MOVIE_DETAILS", fetchMovieDetails);
    yield takeEvery("SEND_NEW_GENRE", sendNewGenre);
    yield takeEvery("SEND_NEW_MOVIE", sendNewMovie);
    yield takeEvery("SEND_NEW_MOVIE_GENRE", sendNewMovieGenre);
    yield takeEvery("PROCESS_NEW_MOVIE", processNewMovie);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
}

function* fetchGenres() {
    try {
        const genres = yield axios.get('/api/genre');
        yield put ({type: "SET_GENRES", payload: genres.data});
    }
    catch (error) {
        console.error("Error in GET '/genre'", error);
    }
}

function* fetchMovieDetails(action){
    try {
        const movieGenres = yield axios.get(`/api/genre/${action.payload.id}`);
        let genreArray = [];
        for (let genre of movieGenres.data){
            genreArray.push(genre.name)
        }
        yield put ({type: "SET_MOVIE_DETAILS", payload: genreArray});
    }
    catch (error) {
        console.error("Error in GET 'api/genre/:id'", error);
    }
}

function* processNewMovie(action){
    try{
        let genreIds = []; // empty array to collect IDs of that movie
        let genres = yield axios.get('/api/genre'); // current genres in DB
        let genreNames = genres.data.map(genre=>{ return(genre.name)}); // Existing genre names
        console.log(action)
        // Iterating over genre names of new movie
        for (let genre of action.payload.genre){ 
            if (genreNames.includes(genre)== false){
                yield axios.post('/api/genre', {name: genre}); // Creates new genre in DB
                genres = yield axios.get('/api/genre'); // Get updated list

                for (let item of genres.data){ // Add new Id to collection of Genre Ids
                    if (item.name == genre){
                        genreIds.push(item.id)
                    }
                }
            }
            else {
                for (let item of genres.data){ 
                    if (item.name == genre){
                        genreIds.push(item.id) // Add id to collection of Genre Ids
                    }
                }
            }
        }

        yield axios.post('/api/movie', action.payload); // Posting movie to DB
        let movies = yield axios.get('/api/movie'); // Getting updated movies
        let newMovieId = 0;

        for (let movie of movies.data){ // Getting DB id of new movie to make junction entry
            if (movie.title == action.payload.title){
                newMovieId = movie.id;
            }
        }

        for (let genre_id of genreIds){ // Adding to junction table
            let newMovie = {
                movie_id : newMovieId,
                genre_id : genre_id
            }
            yield axios.post('/api/movie-genre',newMovie);
        }
        yield put({type: "FETCH_MOVIES"});
        yield put({type: "FETCH_GENRES"});
    }
    catch (error) {
        console.error("Error in processing new movie", error);
    }
}

function* sendNewGenre(action){
    try {
        yield axios.post('/api/genre', action.payload);
        yield put({type: "FETCH_GENRES"});
    }
    catch (error) {
        console.error("Error in GET 'api/movie-genre/:id'", error);
    }
}

function* sendNewMovie(action){
    try {
        yield axios.post('/api/movie', action.payload);
        yield put({type: "FETCH_MOVIES"});
    }
    catch (error) {
        console.error("Error in GET 'api/movie-genre/:id'", error);
    }
}

function* sendNewMovieGenre(action){
    try {
        yield axios.post('/api/movie-genre', action.payload);
    }
    catch (error) {
        console.error("Error in GET 'api/movie-genre/:id'", error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Stores all details of movie for details page
const movieDetails = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIE_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

// Stores most recent search result
const searchResults = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULTS':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        // movieDetails,
        searchResults,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);