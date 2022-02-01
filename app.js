const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const productsRouter = require('./routes/api/products')
const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'shotr'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/products', productsRouter)

app.use((req, res) => {
    res.status(404).json({status: 'error', code: 404, message: 'Not found'})
})

app.use((err, req, res, next) => {
    res.status(500).json({status: 'fail', code: 500, message: err.message})
})

module.exports = app