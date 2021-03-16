'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.sequelize.query("UPDATE tags SET color = '#FF0000' WHERE  color is NULL")
        await queryInterface.changeColumn('tags', 'color', {
            defaultValue: "#FF0000",
            type: Sequelize.STRING,
            allowNull: false
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('tags', 'color', {
            allowNull: true,
            type: Sequelize.STRING
        })
    }
};
