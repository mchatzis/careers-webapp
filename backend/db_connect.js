const mongoose = require('mongoose');

async function connect_db(uri, username, password){
    return await mongoose.connect(uri, {
        user: username,
        pass: password
    })
    .catch(err => {
        console.log("Mongoose failed to connect to mongoDB.")
        throw new Error(err)
    });
};

module.exports = connect_db;