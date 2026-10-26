const express = require('express');
const { Todo } = require('../mongo')
const redis = require('../redis')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  // Keep track of how many todos have been created using Redis.
  try {
    const current = await redis.get('added_todos')
    const count = (current ? parseInt(current, 10) : 0) + 1
    await redis.set('added_todos', count)
  } catch (error) {
    console.log('Redis counter error', error)
  }

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  try {
    req.todo = await Todo.findById(id)
  } catch (error) {
    return res.sendStatus(404)
  }
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
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todo = req.todo
  if (req.body.text !== undefined) todo.text = req.body.text
  if (req.body.done !== undefined) todo.done = req.body.done
  await todo.save()
  res.send(todo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
