const { Schema, model } = require('mongoose')

const testSchema = new Schema({
    testField: String
}, {collection: 'tests'});

const TestModel = model('test', testSchema);

module.exports = TestModel;