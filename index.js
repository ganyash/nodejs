var express = require('express');
var db = require("./models");
var routes = require("./routes/todoRoutes.js");
var path = require('path');
function todoApp() {
    var app = express();
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');
    app.use(express.json());
    app.use(express.urlencoded());
    routes(app);
    var port = process.env.PORT || 4242;
    app.listen(port, function () { return console.log("listening on port " + port); });
}
db.sequelize.authenticate().then(function () {
    console.log("db authenticated");
    todoApp();
});
