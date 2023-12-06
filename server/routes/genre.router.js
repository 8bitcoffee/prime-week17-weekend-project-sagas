const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

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

router.get('/:id', (req, res) => {
  let queryText = `
    SELECT "name" FROM "genres"
    JOIN "movies_genres" ON "movies_genres"."genre_id" = "genres"."id"
    WHERE "movies_genres"."movie_id" = $1;
  `;
  pool.query(queryText,[req.params.id]).then((result) =>{
    res.send(result.rows);
  })
  .catch((error) => {
    console.error(`Error in GET '/genre/:id'.`, error);
    res.sendStatus(500);
  })
});

module.exports = router;