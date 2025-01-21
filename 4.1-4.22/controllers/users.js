const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user-model')

usersRouter.post('/', async (request, response) => {
    try{
    const { username, name, password} = request.body

    if (!username || !password) {
        return response.status(400).json({ error: 'Username and password are required' })
    }

    if (password.length < 3) {
        return response.status(400).json({error: 'The password must have at least 3 characters'})
    }
    
    const existing_user = await User.findOne({ username })
    if (existing_user) {
        return response.status(400).json({error: 'The username must be unique!'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User ({
        username,
        name,
        passwordHash
    })
    const savedUser = await user.save()
    
    response.status(201).json(savedUser)
    } catch(error) {
        response.status(500).json({ error: error.message });
    }
})

usersRouter.get('/', async (req, res) => {
    try{
        const users = await User.find({})
        .populate('blogs_made')
        res.json(users)
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Error trying to get the users'})
    }
})

module.exports = usersRouter