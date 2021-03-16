const db = require("../models");
const user = require("../models/user");
const Todo = db.todo;
const TodosTags = db.todosTags;
const Tags = db.tags;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    let { userId } = req.params;
    let { page } = req.query;
    let todo = {
        title: req.body.title,
        dueDate: req.body.dueDate,
        isCompleted: req.body.isCompleted === 'on' ? true : false,
        userId: parseInt(userId)
    };

    page = page ? parseInt(page) : 1;

    userId = parseInt(userId);


    console.log("todosdfsdfsdfs", todo);
    try {
        let createdTodo = await Todo.create(todo);
        if (req.body.tags) {
            todo['tags'] = req.body.tags.split(",");
            for (let tag of todo['tags']) {
                console.log("tagsdfsdffs", tag)
                tagItem = {
                    tagName: tag,
                }
                const createdTag = await Tags.create(tagItem);
                const todoTagIds = {
                    todoId: createdTodo.id,
                    tagId: createdTag.id
                }
                await TodosTags.create(todoTagIds);
            }
        }
        const { count, rows } = await Todo.findAndCountAll({
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

        const rowTodos = rows;
        console.log(JSON.stringify(rowTodos), null, 4)
        const totalTodos = count;

        res.render('todosListAndCreateTodo', {
            todos: rowTodos,
            userId: parseInt(userId),
            page: page,
            totalTodos: totalTodos,
            totalTodosInCurrentPage: JSON.stringify(rowTodos)
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
        res.status(200).send("Deleted Successfully");
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred ."
        });
    }


}

exports.userTodoForUpdate = async (req, res) => {
    let { userId, todoId } = req.params;

    let tagIds = await TodosTags.findAll({
        attributes: ['tagId'],
        where: {
            todoId: parseInt(todoId)
        }
    })
    tagIds = tagIds.map(tagIds => tagIds.tagId);


    let tagsList = await Tags.findAll({
        where: {
            id: tagIds
        }
    })
    let todoItem = await Todo.findOne({
        where: {
            id: parseInt(todoId)
        }
    })
    if (todoItem === null || todoItem === undefined) {
        res.send("Todo does not exist")
    }

    res.render('updateTodo', {
        tags: tagsList,
        todo: todoItem ? todoItem : {},
        userId,
        todoId
    });

}

exports.updateTodo = async (req, res) => {
    let { todoId } = req.params;
    todoId = parseInt(todoId)
    let todo = {
        title: req.body.title,
        dueDate: req.body.dueDate,
        isCompleted: req.body.isCompleted
    };

    console.log("tojkgdosdfsdfsdfs", req.body);
    try {
        let updateTodo = await Todo.update(todo, {
            where: {
                id: todoId
            }
        });
        res.status(200).send("updated successfully");
    }
    catch (err) {
        console.log("err", err);
        res.status(500).send(err);
    }
}


