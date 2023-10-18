const mongoose = require('mongoose');

async function connect_db(uri, username, password){
    return await mongoose.connect(uri, {
        user: username,
        pass: password
    })
};

module.exports = connect_db;