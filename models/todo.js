const { DataTypes } = require("sequelize");
// const db = require(index.js)
// const User = require("./user.js")
module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todo", {
        title: {
            type: DataTypes.STRING
        },
        dueDate: {
            type: DataTypes.DATE
        },
        isCompleted: {
            type: DataTypes.BOOLEAN
        }
    }, {
        freezeTableName: true
    });
    // Todo.hasOne(User, {
    //     foreignKey: 'todoId'
    // })
    return Todo;
};