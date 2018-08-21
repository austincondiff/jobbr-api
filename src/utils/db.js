const mongoose = require('mongoose')

const connect = () => {
  mongoose.connect(
    'mongodb://localhost:27017/jobbr',
    { useNewUrlParser: true }
  )
}

const disconnect = () => {
  mongoose.connection.close()
}

export default {
  connect,
  disconnect
}
