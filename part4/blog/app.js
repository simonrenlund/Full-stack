const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Blog = require('./models/blog')
const config = require('./utils/config')
const blogRouter = require('./controllers/blog')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true }).then( () => {
  console.log('Connected to MongoDB')
})

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())


app.use('/api/blogs', blogRouter)


module.exports = app
