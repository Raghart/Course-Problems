import { DataTypes } from "sequelize";

export const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('active_sesions', 'token', {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  });
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('active_sesions', 'token');
};