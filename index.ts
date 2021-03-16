const express = require('express')
const db = require("./models");
const routes = require("./routes/todoRoutes.js");
const path = require('path');
function todoApp() {
    const app = express();

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug')

    app.use(express.json());
    app.use(express.urlencoded());
    routes(app);

    const port = process.env.PORT || 4242;

    app.listen(port, () => console.log(`listening on port ${port}`))
}
db.sequelize.sync().then(() => {
    console.log("db synced");
    todoApp();
});