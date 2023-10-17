const TestModel = require('./schema')
const db_connect = require('./db_connect')

async function main(){
    const connection = await db_connect(process.env.DB_URI, process.env.DB_USERNAME, process.env.DB_PASSWORD);

    // TestModel.create({testField: 'test data'});

    TestModel.find()
    .then(data => console.log(data))
};

main();