module.exports = app => {
    const user = require("../controller/userController.js");

    const todo = require("../controller/todoController.js")

    const tag = require("../controller/tagController.js")

    var router = require("express").Router();

    app.use('/api', router);

    router.post("/user", user.create);

    router.get("/users", user.list);

    router.get("/", user.userTodoView)

    router.put("/users/:userId", user.update)

    router.get("/todos", todo.list);

    router.post("/todo", todo.create);

    router.delete("/todos/:todoId", todo.delete)

    router.get("/users/:userId/todos", user.listTodos)

    router.post("/users/:userId/todos", todo.create)

    router.get("/users/:userId/todos/:todoId", user.userTodoView)


    router.get("/users/:userId/todos/:todoId/update", todo.userTodoForUpdate)

    router.put("/todos/:todoId/update", todo.updateTodo)

    router.post("/tags/create", tag.create)

};