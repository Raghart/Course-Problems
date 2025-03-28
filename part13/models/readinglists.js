import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db.js";

export class readinglists extends Model {}
readinglists.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
      },
      blogId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'blogs', key: 'id' },
      },
      read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    }, {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'readinglists'
});