const express = require('express')
const db = require("./models");
const routes = require("./routes/todoRoutes.js")
function todoApp() {
    const app = express();

    app.use(express.json());
    routes(app);

    const port = process.env.PORT || 4242;

    app.listen(port, () => console.log(`listening on port ${port}`))
}
db.sequelize.sync().then(() => {
    console.log("db synced")
    todoApp();
});