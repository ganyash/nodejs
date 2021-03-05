const dbConfig = require("../config/dbConfig.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.authenticate().then(() => console.log("connected"))

db.todo = require("./todo.js")(sequelize, Sequelize);
db.user = require("./user.js")(sequelize, Sequelize);

const { user, todo } = db;

todo.hasMany(user, {
    foreignKey: 'todoId'
})

user.belongsTo(todo);

module.exports = db;

