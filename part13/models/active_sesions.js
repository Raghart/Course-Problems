import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db.js";

export class active_sesions extends Model {}
active_sesions.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    }, {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'active_sesions'
});