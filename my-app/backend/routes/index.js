const express = require('express');
const router = express.Router();

const configs = require('../util/config')
const redis = require('../redis')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

/* GET usage statistics. */
router.get('/statistics', async (req, res) => {
  let addedTodos = 0
  try {
    const value = await redis.get('added_todos')
    if (value !== null && value !== undefined) {
      addedTodos = Number(value)
    }
  } catch (error) {
    console.log('Redis statistics error', error)
  }

  res.send({
    added_todos: addedTodos
  });
});

module.exports = router;
