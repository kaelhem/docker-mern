const express = require('express')
const apiRoutes = express.Router()
const Todo = require('../models/todo')

// list of the "todo" saved in db
apiRoutes.get('/list', (req, res) => {
  Todo.find({}, async (err, todos) => {
    if (err) {
      res.status(500).json({message: 'Search error!'})
    } else {
      res.status(200).json(todos)
    }
  })
})

// list of the "todo" saved in db
apiRoutes.post('/add', (req, res) => {
  const {name, description} = req.body
  const todo = new Todo({
    name,
    description,
    creationDate: new Date()
  })
  todo.save(function(err, item) {
    if (err || !item) {
      return res.status(500).json({message: 'Save error!'})
    } else {
      return res.status(200).json(item)  
    }
  })
})

// list of the "todo" saved in db
apiRoutes.delete('/:id', (req, res) => {
  Todo.findByIdAndRemove(req.params.id, (err, resultQuery) => {
    if (err) {
      return res.status(500).json({message: 'Remove error!'})
    } else {
      return res.status(200).json(resultQuery)  
    }
  })
})

module.exports = apiRoutes