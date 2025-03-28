import { Router } from "express"; 
import { Blogs } from "../models/blog.js";
import { Users } from "../models/user.js";
import { ValidationError } from "../util/error.js";
import { tokenExtractor } from "../util/tokenExtractor.js";
import { validateSession } from "../util/validateSession.js";
import { Op } from "sequelize";

const blogsRouter = Router()

const blogFinder = async (req, res, next) => {
    req.blog = await Blogs.findByPk(req.params.id);
    next()
}

blogsRouter.get('/', async (req, res) => {
    const where = {};

    if (req.query.search) {
        where[Op.or] = [
            { title: { [Op.substring]: req.query.search } },
            { author: { [Op.substring]: req.query.search } }
        ];
    };

    const blogs = await Blogs.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: Users,
            attributes: ['name']
        },
        where,
        order: [['likes', 'DESC']]
    });

    res.json(blogs);
});

blogsRouter.post('/', validateSession, tokenExtractor, async (req, res) => {
    if (!req.body.title || !req.body.author) {
        throw new ValidationError('The title and author field cant be null!');
    }
    const user = await Users.findByPk(req.decodedToken.id);

    const blog = await Blogs.create({...req.body, userId: user.id});

    res.status(201).json(blog);
});

blogsRouter.put('/:id', blogFinder, async(req, res) => {
    if (!req.body.likes && req.body !== 0) {
        throw new ValidationError('The likes field is mandatory and cant be 0!')
    }

    if (req.blog) {
        console.log(req.body.likes);
        req.blog.likes = req.body.likes;
        await req.blog.save();
        res.json(req.blog)
    } else {
        res.status(404).end();
    }
});

blogsRouter.delete('/:id', blogFinder, validateSession, tokenExtractor, async (req, res, next) => {
    try{
        if (!req.decodedToken || !req.decodedToken.id) {
            return res.status(401).json({ error: "Token missing or invalid" });
        }

        if (req.blog) {
            const user = await Users.findByPk(req.decodedToken.id);

            if (!user) {
                return res.status(401).json({ error: "User not found" });
            }

            if (req.blog.userId === user.id) {
                await req.blog.destroy();
                res.status(200).end();
                
            } else {
                res.status(400).json({ error: "Only the user who created de blog can delete it"}).end();
            }
        } else {
            res.status(404).end();
        }
    } catch (error) {
        next(error);
    }
});

export default blogsRouter
