const mongoose = require('mongoose');

async function connect_db(uri, username, password){
    return await mongoose.connect(uri, {
        user: username,
        pass: password
    })
};

async function disconnect_db(){
    return await mongoose.disconnect();
}

module.exports = { connect_db, disconnect_db };