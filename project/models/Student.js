const { Sequelize } = require("sequelize");
const Sequalize = require("sequelize");

const Student = Sequelize.define('student', {
    fname: {
        type: Sequelize.STRING
    },
    lname: {
        type: Sequelize.STRING
    },
    sex: {
        type: Sequelize.STRING
    },
    DOB: {
        type: Sequelize.STRING
    },
    fname: {
        type: Sequelize.STRING
    },
    fname: {
        type: Sequelize.STRING
    }
})

