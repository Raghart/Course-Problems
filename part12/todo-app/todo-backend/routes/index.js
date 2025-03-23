const express = require('express');
const redis = require('../redis');
const router = express.Router();
const { getAsync } = require('../redis');

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

/* GET/statistics */
router.get('/statistics', async (req, res) => {
  let added_todos = await getAsync("added_todos");
  if (added_todos === null) { added_todos = 0}
  res.send({ "added_todos": added_todos });
});

module.exports = router;
