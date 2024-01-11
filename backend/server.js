const http = require('http');
const path = require('path');
const express = require('express');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServer } = require('@apollo/server');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connect_db, disconnect_db } = require('./db-connect');
const typeDefs = require('./gql-schema');
const resolvers = require('./gql-resolvers');

const env = {
    'HOST_NAME': process.env.HOST_NAME,
    'HOST_PORT': process.env.HOST_PORT
};

var isProduction = true;
if (process.env.NODE_ENV !== 'production'){
    isProduction = false;
}

async function main(){
    await connect_db(process.env.DB_URI, process.env.DB_USERNAME, process.env.DB_PASSWORD);
    
    const app = express();
    const httpServer = http.createServer(app);

    const gqlServer = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    });
    await gqlServer.start();

    app.use(
        '/api',
        cors(),
        bodyParser.json(),
        expressMiddleware(gqlServer, {
            context: async ({ req }) => ({ token: req.headers.token }),
        })
    );

    const clientRoutes = [
        "/",
        "/search",
        "/about"
    ]
    clientRoutes.forEach((route)=>{
        app.get(route, function(req,res){
            res.send(html);
        })
    });

    app.use(express.static(path.join(__dirname, '../dist')));

    const port = process.env.HOST_PORT;
    const host = process.env.HOST_NAME;
    httpServer.listen(port, host, listeningListener= ()=>{
        console.log(`Server running on http://${host}:${port}`)
    });
};


main();


const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Index</title>    
</head>
<body>
    <script>
        const env = ${JSON.stringify(env)};
    </script>
    <div id="root"></div>
    <script src="bundle.js"></script>
</body>
</html>
`