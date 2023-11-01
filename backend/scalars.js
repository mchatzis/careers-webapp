const { GraphQLScalarType, Kind } = require('graphql');


const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date scalar',
    serialize(dateObj){
        if (dateObj instanceof Date){
            return dateObj.toUTCString();
        }
        throw Error('GraphQL Date Scalar serializer expected a Date object' + 
        '\n instead got a ' + typeof(dateObj))
    },
});


module.exports = dateScalar;

