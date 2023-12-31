const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// Returns all genres
router.get('/', (req, res) => {
  let queryText = `SELECT * FROM "genres";`
  pool.query(queryText).then((result) =>{
    res.send(result.rows);
  })
  .catch((error) => {
    console.error(`Error in GET '/genre'.`, error);
    res.sendStatus(500);
  })
});

// Gets all genres for specific movie
router.get('/:id', (req, res) => {
  let queryText = `
    SELECT name FROM genres
    JOIN movies_genres ON movies_genres.genre_id = genres.id
    WHERE movies_genres.movie_id = $1;
  `;
  pool.query(queryText,[req.params.id]).then((result) =>{
    res.send(result.rows);
  })
  .catch((error) => {
    console.error(`Error in GET '/genre/:id'.`, error);
    res.sendStatus(500);
  })
});

// Creates new genre
router.post('/', (req,res) => {
  let queryText = `
    INSERT INTO genres (name)
    VALUES ($1)
    RETURNING id;
  `;
  pool.query(queryText,[req.body.name])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error(`Error in POST '/genre'.`, error);
      res.sendStatus(500);
    })
  ;
})

module.exports = router;