const db = require("../models");
const Tags = db.tags;

exports.create = async (req, res) => {
    let tagItem = {
        tagName: req.body.tag
    }
    try {
        await Tags.create(tagItem);
        res.status(200).send(tagItem);
    }
    catch (err) {
        res.send(err)
    }
}