const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// GET for all movies
router.get('/', (req, res) => {
  const query = `SELECT * FROM movies ORDER BY "title" ASC`;

  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })
});

// Route to return all info for single movie
router.get('/:id', (req, res) => {
  const queryText = `
  SELECT 
    movies.id AS id,
    movies.title AS title,
    movies.poster AS poster,
    movies.description AS description
  FROM movies
  WHERE movies.id = $1;
  `;
  pool.query(queryText, [req.params.id])
  .then((result) => {
    console.log("result:",result.rows)
    res.send(result.rows);
  })
  .catch(error => {
    console.error(`Error in GET 'api/movie/:id`, error)
    res.sendStatus(500)
  })
});

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    res.sendStatus(201);
    res.send(result.rows[0].id);
  })
// Catch for first query
  .catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;