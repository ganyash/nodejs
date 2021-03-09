const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Tags = sequelize.define("tags", {
        tagName: {
            type: DataTypes.STRING
        },
        todoId: {
            type: DataTypes.INTEGER
        }
    }, {
        freezeTableName: true
    });

    return Tags;
};