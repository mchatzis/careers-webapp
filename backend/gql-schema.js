const typeDefs = `#graphql

    type Company {
        name: String!,
        industry: String
    }

    type Query {
        companies: [Company]
    }

    type Mutation {
        addCompany(name:String!, industry:String): Company
    }
`;

module.exports = typeDefs;