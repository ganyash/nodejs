const db = require("../models");
const Todo = db.todo;

const Tags = db.tags;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    let { userId } = req.params;
    let todo = {
        title: req.body.title,
        dueDate: req.body.dueDate,
        isCompleted: req.body.isCompleted === 'on' ? true : false,
        userId: parseInt(userId)
    };


    console.log("todosdfsdfsdfs", todo);
    try {
        let createdTodo = await Todo.create(todo);
        if (req.body.tags) {
            todo['tags'] = req.body.tags.split(",");
            for (let tag of todo['tags']) {
                console.log("tagsdfsdffs", tag)
                tagItem = {
                    tagName: tag,
                    todoId: createdTodo.id

                }
                await Tags.create(tagItem);
            }
        }
        let todosList = await Todo.findAll({
            where: {
                userId: parseInt(userId)
            }
        })

        res.render('todosListAndCreateTodo', {
            todos: todosList,
            userId: parseInt(userId)
        });
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


