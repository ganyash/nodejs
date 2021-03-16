const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Tags = sequelize.define("tags", {
        tagName: {
            type: DataTypes.STRING,
            // get() {
            //     return null;
            // },
            // set(val) {
            //     return "yash";
            // }

        },
        color: {
            type: DataTypes.STRING,
            defaultValue: "#FF0000",
            allowNull: false
        },
        // tagColor: {
        //     type: DataTypes.VIRTUAL,
        //     get() {
        //         return `${this.tagName} and ${this.color}`
        //     }
        // }
    }, {
        freezeTableName: true
    });

    return Tags;
};