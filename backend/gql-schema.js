const typeDefs = `#graphql
    scalar Date

    type Company {
        id: ID!
        name: String!
        url: String!
        htmlElem: String!
        paginationUrl: String
        jobs: [Job]
    }

    type Job {
        id: ID!
        title: String!
        location: String!
        dateAdded: Date!
        company: Company!
    }

    type Query {
        companies: [Company]
        jobs(title: String, location: String): [Job]
    }

    type Mutation {
        addCompany(name:String!, url:String!, htmlElem: String!, paginationUrl: String): Company
        addJob(title:String!, location: String!, companyName:String!): Job
    }
`;

module.exports = typeDefs;