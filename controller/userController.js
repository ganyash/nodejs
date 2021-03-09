const db = require("../models");
const user = require("../models/user");
const User = db.user;
const Todo = db.todo;
const Tags = db.tags;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

    try {
        const data = await User.create(user);
        let todo = {};
        if (req.body.todos && req.body.todos.length !== 0) {
            const todosList = req.body.todos;
            for (const todoItem of todosList) {
                todo = {
                    title: todoItem.title,
                    dueDate: todoItem.dueDate,
                    isCompleted: todoItem.isCompleted,
                    userId: data.id
                }
                const createdTodo = await Todo.create(todo);
                let tag = {};
                if (todoItem.tags && todoItem.tags.length !== 0) {
                    const tagsList = todoItem.tags;
                    for (const tagItem of tagsList) {
                        tag = {
                            tagName: tagItem,
                            todoId: createdTodo.id

                        }
                        await Tags.create(tag);

                    }
                }
            }
        }

        res.send(data);
    }

    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred "
        });
    };
};




exports.list = async (req, res) => {

    try {
        const data = await User.findAll();

        res.send(data);
    }

    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred."
        });
    };
};

exports.update = async (req, res) => {
    // Validate request
    let { userId } = req.params;
    req.
        userId = parseInt(userId);


    const row = await User.findAll({
        where: {
            id: {
                [Op.eq]: userId
            }
        }
    })
    if (row.length === 0) {
        res.status(400).send("User id does not exist")
    }

    const user = {
        firstName: req.body.firstName ? req.body.firstName : row[0].firstName,
        lastName: req.body.lastName ? req.body.lastName : row[0].lastName,
        todoId: req.body.todoId ? req.body.todoId : row[0].todoId
    };

    try {
        await User.update(user, {
            where: {
                id: {
                    [Op.eq]: userId
                }
            }
        })

        res.status(200).send(req.body)
    }

    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred "
        });
    };


};


exports.listTodos = async (req, res) => {
    let { userId } = req.params;

    userId = parseInt(userId);

    const rowTodos = await Todo.findAll({
        where: {
            userId: {
                [Op.eq]: userId
            }
        }
    })

    res.render('todosListAndCreateTodo', {
        todos: rowTodos,
        userId: userId
    })

}


exports.userTodoView = async (req, res) => {
    let { userId, todoId } = req.params;
    let tagsList = await Tags.findAll({
        where: {
            todoId: parseInt(todoId)
        }
    })

    let todoItem = await Todo.findOne({
        where: {
            id: parseInt(todoId)
        }
    })

    res.render('singleTodo', {
        tags: tagsList,
        todo: todoItem
    });



    // console.log(req.query)
    // const { user, view, todoId } = req.query;
    // if (user && view && view === "todos") {

    //     const rowUser = await User.findAll({
    //         where: {
    //             id: parseInt(user)
    //         }
    //     })
    //     if (rowUser.length === 0) {

    //         res.send("User id does not exist")
    //     }
    //     if (rowUser[0].todoId === null) {
    //         res.send("No todo assigned to user")
    //     }
    //     const rowTodo = await Todo.findAll({
    //         where: {
    //             id: {
    //                 [Op.eq]: rowUser[0].todoId
    //             }
    //         }
    //     })

    //     res.send(rowTodo);
    // }

    // if (view && view === 'todo' && todoId) {
    //     const rowTodo = await Todo.findAll({
    //         where: {
    //             id: {
    //                 [Op.eq]: parseInt(todoId)
    //             }
    //         }
    //     })
    //     res.send(rowTodo);
    // }

    // res.status(400).send("Check Query Parameters")
}


