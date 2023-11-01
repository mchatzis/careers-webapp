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
        addCompany: (_,{name, url, pagination_url}) => Company.create({name, url, pagination_url}),
        addJob: async (_, {title, location, companyName}) => {
                    const date_added = Date.now();
                    const company = await Company.findOne({name:companyName}).exec();
                    const job = await Job.create({title, location, date_added, company});
                    return job
        }
    }
};

module.exports = resolvers;