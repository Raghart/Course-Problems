import { Router } from "express"; 
import { Blogs } from "../models/blog.js";
import { sequelize } from "../util/db.js";

const authorsRouter = Router()

authorsRouter.get('/', async (req, res) => {
    try {
        const authors = await Blogs.findAll({
            attributes: [
                'author',
                [sequelize.fn('COUNT', sequelize.col('id')), 'articles'],
                [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
            ],
            group: ['author'],
            order: [[sequelize.fn('SUM', sequelize.col('likes')), 'DESC']]
        });
        res.json(authors);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los autores' });
    }
});

export default authorsRouter