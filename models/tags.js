const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Tags = sequelize.define("tags", {
        tagName: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true
    });

    return Tags;
};