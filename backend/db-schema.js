const { Schema, model } = require('mongoose')

const companies = new Schema({
    name: String,
    industry: String
}, {collection: 'companies'});

const Company = model('company', companies);

module.exports = Company;