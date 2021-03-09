const { DataTypes } = require("sequelize");
// const Todo = require("./todo.js")
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        }
    },
        {
            freezeTableName: true
        });
    // User.belongsTo(Todo);
    return User;
};