const express = require('express');
const router = express.Router();
const redis = require('../redis')


router.get('/', async (req, res) => {
  let todos = await redis.getAsync('added_todos')
  if (todos == null) {
    await redis.setAsync('added_todos', 0)
  }
  res.send({
    todos
  });
});

module.exports = router;