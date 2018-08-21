import express from 'express'
import bodyParser from 'body-parser'
import routesConfig from './v1'

const app = express()
const port = process.env.PORT || 6400
const router = express.Router()

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DEconstE')
  res.header('Access-Control-Expose-Headers', 'Content-Length')
  res.header(
    'Access-Control-Allow-Headers',
    'Accept, Authorization, Content-Type, X-Requested-With, Range'
  )
  if (req.method === 'OPTIONS') {
    return res.send(200)
  } else {
    return next()
  }
})

router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the Jobbr API!' })
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
routesConfig(app)
app.use('/', router)
app.listen(port)
console.log('Magic happens on port ' + port)
