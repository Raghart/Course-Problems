import { DataTypes } from "sequelize";

export const up = async ({ context: QueryInterface }) => {
    await QueryInterface.addColumn('blogs', 'year', {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1991,
            max: new Date().getFullYear()
        },
    })
}

export const down = async ({ context: QueryInterface }) => {
    await QueryInterface.removeColumn('blogs', 'year');
}