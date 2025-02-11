const User = require('../models/user-model')
const jwt = require('jsonwebtoken')

const userExtractor = async(req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        
        const token = authorization.substring(7);
        const decodedToken = jwt.verify(token, process.env.SECRET);
        
        if (decodedToken.id) {
            req.user = await User.findById(decodedToken.id);
        }
    }
    next();
};

module.exports = userExtractor