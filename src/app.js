import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import hbsMiddleware from 'express-handlebars'
import fs from 'fs'

const app = express()

// view engine setup
app.set('views', path.join(new URL('../views', import.meta.url).pathname))
app.engine(
  'hbs',
  hbsMiddleware({
    defaultLayout: 'default',
    extname: '.hbs',
  })
)
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())

app.use(express.static(new URL('../public', import.meta.url).pathname))
app.use(bodyParser.urlencoded({ extended: true }))

// ---------------------------------

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is listening...')
})

app.get('/', (req, res) => {
  res.send('Hello from the backend')
})

app.get('/home', (req, res) => {
  res.render('home')
})

app.get('/podcasts', (req, res) => {
  let podcasts = [
    'The Daily',
    'MBMBAM',
    'Reply All',
    'This American Life',
    'Mission to Zyx',
  ]

  res.render('podcast-index', { podcasts: podcasts })
})

export default app
