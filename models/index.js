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
db.tags = require("./tags.js")(sequelize, Sequelize);
db.todosTags = require("./todosTags.js")(sequelize, Sequelize);

const { user, todo, tags, todosTags } = db;

user.hasMany(todo, {
    foreignKey: 'userId'
})

todo.belongsTo(user);


todo.belongsToMany(tags, { through: 'todosTags' });
tags.belongsToMany(todo, { through: 'todosTags' });


module.exports = db;

