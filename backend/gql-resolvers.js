const Company = require('./db-schema');

const resolvers = {
    Query: {
        companies: () => Company.find().exec()
    },

    Mutation: {
        addCompany: (_,{name, industry}) => Company.create({name, industry})
    }
};

module.exports = resolvers;