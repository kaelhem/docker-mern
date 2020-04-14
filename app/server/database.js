const mongoose = require('mongoose')
const config = require('./config')

const connect = () => {
  console.log('will connect to : ', config.database)
  return mongoose.connect(config.database, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }) 
}

module.exports = {
  connect
}