import jwt from 'jsonwebtoken';
import { SECRET } from './config.js';

export const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            const token = authorization.substring(7);
            req.token = token;
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET);  
        } catch (error) {
            res.status(401).json({ error: 'token invalid' })
        }
    } else {
        res.status(401).json({ error: 'token missing' })
    }
    next()
}