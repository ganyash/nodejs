'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.addColumn('tags', 'color', { type: Sequelize.STRING });
    },

    down: async (queryInterface, Sequelize) => {
        queryInterface.removeColumn('tags', 'color');
    }
};
