const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const usersRouter = require('./routes/v1/users/users')
const productsRouter = require('./routes/v1/products/products')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet())
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({limit: 10000}))

app.use('/api/v1/users', usersRouter)
app.use('/api/v1/products', productsRouter)

app.use((req, res) => {
  res.status(404).json({ status: 'error', code: 404, message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ status: 'fail', code: 500, message: err.message })
})

module.exports = app