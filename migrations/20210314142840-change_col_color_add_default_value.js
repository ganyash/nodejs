'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.changeColumn('tags', 'color', {
            defaultValue: "#FF0000",
            allowNull: false
        })
    },

    down: async (queryInterface, Sequelize) => {
        queryInterface.changeColumn('tags', 'color', {
            allowNull: true
        })
    }
};
