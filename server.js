const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
dotenv.config()

// My imports
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')

// Connection with Database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log('Database connected'))

// Middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

// Routes middleware
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)

// Listening Port
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`App running on ${port}`))
