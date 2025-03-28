import jwt from 'jsonwebtoken';
import Router from 'express';
import { SECRET } from '../util/config.js';
import { Users } from '../models/user.js';
import { active_sesions } from '../models/active_sesions.js';

const loginRouter = Router();

loginRouter.post('/', async(req, res) => {
    const body = req.body;
    const user = await Users.findOne({
        where: {
            username: body.username
        }
    })

    const passwordCorrect = body.password === 'secret'

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    console.log(user.enabled);
    if (!user.enabled) {
        user.enabled = true;
        await user.save();
    }
    console.log(user.enabled);

    const userForToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(userForToken, SECRET);
    await active_sesions.create({ userId: user.id, token, active: true });

    res
    .status(200)
    .send({ token, username: user.username, name: user.name })
});

export default loginRouter