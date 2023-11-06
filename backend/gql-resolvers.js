const { Company, Job } = require('./db-schema');
const dateScalar = require('./scalars');

const resolvers = {
    Query: {
        companies() {return Company.find().exec()},
        jobs() {return Job.find().exec()}
    },

    Company: {
        jobs(parent) {return Job.find({company:parent}).exec()}
    },

    Job: {
        company(parent) {return Company.findOne(parent.company).exec();}
        },

    Date: dateScalar,

    Mutation: {
        addCompany: (_,{name, url, htmlElem, paginationUrl}) => Company.create({name, url, htmlElem, paginationUrl}),
        addJob: async (_, {title, location, companyName}) => {
                    const dateAdded = Date.now();
                    const company = await Company.findOne({name:companyName}).exec();
                    const job = await Job.create({title, location, dateAdded, company});
                    return job
        }
    }
};

module.exports = resolvers;