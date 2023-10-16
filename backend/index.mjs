import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const db_uri = "mongodb+srv://careers-cluster.x1cw5we.mongodb.net/careers-db?retryWrites=true&w=majority"
mongoose.connect(db_uri, {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD
});

mongoose.connection.once('open', () => console.log('Connection to mongoDb successful'));
mongoose.connection.on('error', (error) => console.log(error));

const testSchema = new Schema({
    testField: String
});

const TestModel = model('test', testSchema);
// TestModel.create({testField: 'test field content'})
// .then(res => console.log(res))