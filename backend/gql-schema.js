const typeDefs = `#graphql
    scalar Date

    type Company {
        id: ID!
        name: String!
        url: String!
        pagination_url: String
        jobs: [Job]
    }

    type Job {
        id: ID!
        title: String!
        location: String!
        date_added: Date!
        company: Company!
    }

    type Query {
        companies: [Company]
        jobs: [Job]
    }

    type Mutation {
        addCompany(name:String!, url:String!, pagination_url: String): Company
        addJob(title:String!, location: String!, companyName:String!): Job
    }
`;

module.exports = typeDefs;