const db = require("../models");
const user = require("../models/user");
const User = db.user;
const Todo = db.todo;
const Tags = db.tags;
const TodosTags = db.todosTags;
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
                            tagName: tagItem
                        }
                        const createdTag = await Tags.create(tag);
                        const todoTagIds = {
                            todoId: createdTodo.id,
                            tagId: createdTag.id
                        }
                        await TodosTags.create(todoTagIds);

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
    let { page } = req.query;
    page = page ? parseInt(page) : 1;

    userId = parseInt(userId);

    const isUserIdPresent = await User.findOne({
        where: {
            id: userId
        }
    })

    if (isUserIdPresent === null) {
        res.send("User id does not exist, please create user first.")
    }

    const totalTodos = await Todo.findAll({
        where: {
            userId: userId
        }
    });

    const rowTodos = await Todo.findAll({
        where: {
            userId: {
                [Op.eq]: userId
            }
        },
        order: [
            ['updatedAt', 'DESC']
        ],
        offset: (page - 1) * 5,
        limit: 5
    })

    res.render('todosListAndCreateTodo', {
        todos: rowTodos,
        userId: userId,
        page: page,
        totalTodos: JSON.stringify(totalTodos)
    })

}


exports.userTodoView = async (req, res) => {
    let { userId, todoId } = req.params;
    let tagIds = await TodosTags.findAll({
        attributes: ['tagId'],
        where: {
            todoId: parseInt(todoId)
        }
    })
    tagIds = tagIds.map(tagIds => tagIds.tagId);
    console.log("tagIds", tagIds);

    let todoItem = await Todo.findOne({
        where: {
            id: parseInt(todoId)
        }
    })

    if (todoItem === null || todoItem === undefined) {
        res.send("Todo does not exist")
    }


    let tagsList = await Tags.findAll({
        where: {
            id: tagIds
        }
    })


    console.log(todoItem, tagsList);
    res.render('singleTodo', {
        tags: tagsList,
        todo: todoItem ? todoItem : {}
    });
}


