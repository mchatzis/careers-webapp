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
            res.sendFile(path.join(__dirname, '../dist/index.html'));
        })
    });

    const port = process.env.HOST_PORT;
    const host = process.env.HOST_NAME;
    httpServer.listen(port, host, listeningListener= ()=>{
        console.log(`Server running on http://${host}:${port}`)
    });
};


main();