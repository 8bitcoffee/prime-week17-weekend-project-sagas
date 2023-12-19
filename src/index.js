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
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
}

function* fetchGenres() {
    try {
        const genres = yield axios.get('/api/genre');
        console.log('get all: ', genres.data);
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
        console.log(action.payload.genre);
        let genreIds = []
        const genres = yield axios.get('/api/genre');
        console.log(genres.data);
        const genreNames = genres.data.map(genre=>{ return(genre.name)});
        console.log(genreNames)
        for (let genre of action.payload.genre){
            if (genreNames.includes(genre)==false){
                const response = yield axios.post('/api/genre', {name: genre});
                console.log(response.data.id);
                genreIds.push(response.data.id);
            }
            else {
                const savedGenre = genres.data.map(genreMap => {return(genreMap.name == genre ? genreMap.id : null)});
                console.log(savedGenre);
                genreIds.push(savedGenre.id);
            }
        }
        const filteredGenreIds = genreIds.filter(e=>e);
        console.log(filteredGenreIds);
        const movieID = yield axios.post('/api/movie', action.payload);
        console.log(movieID);
        for (let id of filteredGenreIds){
            yield axios.post('/api/movie-genre',(movieID, id));
            console.log(id);
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