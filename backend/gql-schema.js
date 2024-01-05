const typeDefs = `#graphql
    scalar Date

    type Company {
        id: ID!
        name: String!
        url: String!
        jobsSelector: String!
        cookiesSelector: String
        paginationSelector: String
        jobs: [Job]
    }

    type Job {
        id: ID!
        title: String!
        locations: [String!]!
        dateAdded: Date!
        company: Company!
    }

    type Query {
        companies: [Company]
        jobs(title: String, location: String): [Job]
        titles: [String]
        locations: [String]
    }

    type Mutation {
        addCompany(
            name:String!, 
            url:String!, 
            jobsSelector: String!, 
            cookiesSelector: String, 
            paginationSelector: String
        ): Company
        addJob(title:String!, locations: [String]!, companyName:String!): Job
    }
`;

module.exports = typeDefs;