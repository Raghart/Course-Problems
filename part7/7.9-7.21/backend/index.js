const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/app.js')
const usersRouter = require('./controllers/users.js')
const loginRouter = require('./controllers/login.js')
const tokenExtractor = require('./utils/token_helper.js')
const userExtractor = require('./utils/user-helper.js')
require('dotenv').config()

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
})

app.use(cors());
app.use(express.json()); 
app.use(tokenExtractor)
app.use(userExtractor)
app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing.js')
    app.use('/api/testing', testingRouter)
}

module.exports = app