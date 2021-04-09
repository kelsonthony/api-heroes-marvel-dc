const Sequelize = require('sequelize')

const heroSchema = {

    name: 'postgresheroesDCComics',

    schema: {

        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            required: true
        },
        power: {
            type: Sequelize.STRING,
            required: true
        }
    },
    options: {
        tableName: 'TB_HEROIS_DC',
        freezeTableName: false,
        timestamps: false
    }
}

module.exports = heroSchema