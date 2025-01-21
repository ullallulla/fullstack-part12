const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

const TODOS_COUNTER_KEY = 'added_todos'

const setCounter = async () => {
  let todos = await redis.getAsync(TODOS_COUNTER_KEY)
  const newTodo = Number(todos) + 1;
  await redis.setAsync(TODOS_COUNTER_KEY, newTodo);
}

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  setCounter()
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = await req.todo
  res.send(todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {

  const todo = {
    text: req.body.text,
    done: req.body.done
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.todo._id, todo, {new: true})

  res.status(200).json(updatedTodo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
