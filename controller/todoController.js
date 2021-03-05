const db = require("../models");
const Todo = db.todo;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    const todo = {
        title: req.body.title,
        dueDate: req.body.dueDate,
        isCompleted: req.body.isCompleted
    };

    try {
        const data = await Todo.create(todo);

        res.send(data);
    }

    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred."
        });
    };
};




exports.list = async (req, res) => {

    try {
        const data = await Todo.findAll();

        res.send(data);
    }

    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred."
        });
    };
};

exports.delete = async (req, res) => {
    const { todoId } = req.params
        ;
    console.log("todoId", todoId)
    try {

        await Todo.destroy({
            where: {
                id: parseInt(todoId)
            }
        })
        res.send("deleted")
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred ."
        });
    }


}


