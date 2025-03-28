import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db.js";

export class Users extends Model {}
Users.init({
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
        isEmail: {
            msg: "Username must be a valid email address"
        }
    }
    },
    name: {
    type: DataTypes.STRING,
    allowNull: false
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
    }, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'user'
});