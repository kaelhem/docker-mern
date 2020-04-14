const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  creationDate: Date
})

module.exports = mongoose.model('todos', TodoSchema)
