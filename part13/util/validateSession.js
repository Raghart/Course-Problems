import { active_sesions } from "../models/active_sesions.js";
import { Users } from "../models/user.js";

export const validateSession = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Token missing or invalid" });
    }

    try{
        const session = await active_sesions.findOne({ where: { token, active: true } });
        if (!session) {
            return res.status(401).json({ error: "Session invalid or expired" });
        }

        const user = await Users.findByPk(session.userId);
        if (!user || !user.enabled) {
            return res.status(403).json({ error: "User is disabled" });
        }

        req.user = user;
        next();

    } catch (error) {
        next(error);
    }
};