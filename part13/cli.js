import dotenv from 'dotenv'; dotenv.config();
import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL);

class Blogs extends Model {}
Blogs.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.TEXT,
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0  
    },
    }, {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'blog'
});

const printBlogs = async () => {
    const blogs = await Blogs.findAll()
    blogs.map(blog => {
        console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
    })
}

printBlogs()