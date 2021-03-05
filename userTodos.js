// const express = require('express');
// const Joi = require('joi');
// const con = require('./dbConnection.js')

// const app = express();

// app.use(express.json())


// const user_todos = {
//     1: [{
//         id: 1,
//         task: 'ABC',
//     },
//     {
//         id: 2,
//         task: 'XYZ',
//     }],
//     2: [{
//         id: 3,
//         task: 'ABC',
//     },
//     {
//         id: 4,
//         task: 'XYZ',
//     }]
// }

// app.get('/', (req, res) => {
//     res.send(user_todos);
// })

// app.get('/users/:userId/todos', (req, res) => {
//     const { userId } = req.params;
//     if (user_todos[userId] === undefined) {
//         return res.status(404).send('This userId does not exist.');
//     }

//     const resultSend = [];

//     con.query(`SELECT * FROM user WHERE UserId = ${userId}`, function (err, result, fields) {
//         if (err) throw err;
//         resultSend = result;
//     });
//     res.send(resultSend);
// })

// app.get('/users/:userId/todos/:todoId', (req, res) => {
//     let { userId, todoId } = req.params;
//     userId = parseInt(userId);
//     todoId = parseInt(todoId)
//     if (user_todos[userId] === undefined) {
//         return res.status(404).send('This userId does not exist.');
//     }

//     const todo = user_todos[userId].find(todo => todo.id === parseInt(todoId))
//     if (todo === undefined) {
//         return res.status(404).send('This todo does not exist.');
//     }
//     res.send(todo)
// })

// app.post('/users/:userId/todos', (req, res) => {
//     let { userId } = req.params;
//     userId = parseInt(userId);
//     if (user_todos[userId] === undefined) {
//         return res.status(404).send('This userId does not exist.');
//     }
//     const schema = {
//         task: Joi.string().min(1).required()
//     }
//     const valRes = Joi.validate(req.body, schema);
//     if (valRes.error) {
//         return res.status(400).send(valRes.error.details);
//     }

//     const newTodo = {
//         id: user_todos[userId].length + 1,
//         task: req.body.task
//     }

//     user_todos[userId].push(newTodo);
//     res.send(newTodo)

// })

// app.put('/users/:userId/todos/:todoId', (req, res) => {
//     let { userId, todoId } = req.params;
//     userId = parseInt(userId);
//     todoId = parseInt(todoId)
//     if (user_todos[userId] === undefined) {
//         return res.status(404).send('This userId does not exist.');
//     }

//     const todo = user_todos[userId].find(todo => todo.id === parseInt(todoId))
//     if (todo === undefined) {
//         return res.status(404).send('This todo does not exist.');
//     }

//     const schema = {
//         task: Joi.string().min(1).required()
//     }
//     const valRes = Joi.validate(req.body, schema);
//     if (valRes.error) {
//         return res.status(400).send(valRes.error.details);
//     }

//     todo['task'] = req.body.task
//     res.send(todo)

// })

// app.delete('/users/:userId/todos', (req, res) => {
//     let { userId } = req.params;
//     userId = parseInt(userId);
//     if (user_todos[userId] === undefined) {
//         return res.status(404).send('This userId does not exist.');
//     }
//     user_todos[userId] = [];
//     res.send("All todos deleted for this user")
// })

// app.listen(4242, () => {
//     console.log('express is running')
// })