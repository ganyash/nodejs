const { DataTypes } = require("sequelize");
const db = require("../models");
const Todo = db.todo;
const Tags = db.tags;
module.exports = (sequelize, Sequelize) => {
    const TodosTags = sequelize.define('todosTags', {
        todoId: {
            type: DataTypes.INTEGER,
            references: {
                model: Todo,
                key: 'id'
            }
        },
        tagId: {
            type: DataTypes.INTEGER,
            references: {
                model: Tags,
                key: 'id'
            }
        }
    }, {
        freezeTableName: true
    })
    return TodosTags;
};