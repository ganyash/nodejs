const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Tags = sequelize.define("tags", {
        tagName: {
            type: DataTypes.STRING
        },
        color: {
            type: DataTypes.STRING,
            defaultValue: "#FF0000",
            allowNull: true
        }
    }, {
        freezeTableName: true
    });

    return Tags;
};