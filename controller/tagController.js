const db = require("../models");
const Tags = db.tags;

exports.create = async (req, res) => {
    let tagItem = {
        tagName: req.body.tag
    }
    try {
        const t = await Tags.create(tagItem);
        console.log("t", t.tagColor, "tagooooooooooo", Tags)
        res.status(200).send(tagItem);
    }
    catch (err) {
        console.log("hey you are in catch, yipeeee!!!", err)
        res.send(err)
    }
}