import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db.js";

export class Blogs extends Model {}
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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1991,
            max: new Date().getFullYear(),
        },
    },
    }, {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: 'blog'
});