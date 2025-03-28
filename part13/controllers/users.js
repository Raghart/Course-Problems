import { Router } from "express";
import { Users } from "../models/user.js";
import { Blogs } from "../models/blog.js";
import { Op } from "sequelize";

const userRouter = Router();

userRouter.get('/', async (req, res) => {
    const users = await Users.findAll({
        include: {
            model: Blogs,
            attributes: { exclude: ['userId'] }
        }
    });
    res.json(users);
});

userRouter.post('/', async (req, res) => {
    try {
        const user = await Users.create(req.body);
        res.json(user);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

userRouter.get('/:id', async (req, res) => {
    try {
        const where = {}

        if (req.query.read === 'true') {
            where.read = true;
        } else if (req.query.read === 'false') {
            where.read =false;
        }

        const user = await Users.findByPk(req.params.id, {
            attributes: ['name', 'username'],
            include: [
                {
                    model: Blogs,
                    as: 'readings',
                    attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
                    through: {
                        attributes: ['id', 'read'],
                        where
                    }
                }
            ]
        });

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }

    } catch (error) {
        console.error("Error fetching user:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

userRouter.put('/:username', async (req, res) => {
    if (!req.params.username) {
        throw new Error("Username cant be undefined");
    } 

    const user = await Users.findOne({ where: { username: req.params.username } });
    if (user) {
        user.username = req.body.username;
        user.save();
        res.json(user);
    } else {
        res.status(404).json({ error: "Username not found in the Database" });
    }
});

export default userRouter