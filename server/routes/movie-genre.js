const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// Gets all movies from a specific genre. Used for filtering
router.get('/:id', (req,res) => {
    let queryText = `
        SELECT 
            movies.id AS id,
            movies.title AS title,
            movies.poster AS poster,
            movies.description AS description
        FROM movies
        JOIN movies_genres ON movies_genres.movie_id = movies.id
        JOIN genres ON genres.id = movies_genres.genre_id
        WHERE genres.id = $1;
    `;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(error => {
            console.error(`Error in GET 'api/movie-genre/:id`, error)
            res.sendStatus(500)
        })
    ;
});

// Adds entry into junction table. Called after new movie added
router.post('/', (req,res)=>{
    let queryText = `
        INSERT INTO movies_genres (movie_id, genre_id)
        VALUES ($1,$2);
    `;
    pool.query(queryText,[req.body.movie_id, req.body.genre_id])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.error(`Error in GET 'api/movie-genre/:id`, error)
            res.sendStatus(500)
        })
    ;
});

module.exports = router;