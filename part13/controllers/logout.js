import Router from 'express';
import { tokenExtractor } from '../util/tokenExtractor.js';
import { active_sesions } from '../models/active_sesions.js';
import { Users } from '../models/user.js';

const logoutRouter = Router();

logoutRouter.delete('/', tokenExtractor, async (req, res) => {
    try {
        const token = req.token;

        const session = await active_sesions.findOne({ where: { token }});
        const user = await Users.findByPk(req.decodedToken.id);

        if (!session || !user) {
            return res.status(404).json({ error: "Session or User not found" });
        }

        user.enabled = false
        await user.save()
        await session.destroy();

        res.status(200).json({ message: "Logged out sucessfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
})

export default logoutRouter