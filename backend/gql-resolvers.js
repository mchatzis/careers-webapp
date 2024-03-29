const { Company, Job } = require('./db-schema');
const dateScalar = require('./scalars');

function escapeRegex(string) {
    return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}

const resolvers = {
    Query: {
        companies() {return Company.find().exec()},
        jobs(_, {title, location, offset}) {
            const query = Job.find();
            if (title !== undefined && title !== "" && title !== null){
                query.find({title:{'$regex': escapeRegex(title), '$options': 'i'}})
            }
            if (location !== undefined && location !== "" && location !== null){
                query.find({locations: location})
            }

            return query.skip(offset).limit(10).exec();
        },
        titles(){
            return Job.distinct('title').exec();
        },
        locations(){
            return Job.distinct('locations').exec();
        }
    },

    Company: {
        jobs(parent) {return Job.find({company:parent}).exec()}
    },

    Job: {
        company(parent) {return Company.findOne(parent.company).exec();}
        },

    Date: dateScalar,

    Mutation: {
        addCompany: (_,{name, url, jobsSelector, cookiesSelector, paginationSelector}) => 
            Company.create({
                name, 
                url, 
                jobsSelector, 
                cookiesSelector,
                paginationSelector
            }),
        addJob: async (_, {title, locations, companyName}) => {
                    const dateAdded = Date.now();
                    const company = await Company.findOne({name:companyName}).exec();
                    const job = await Job.create({title, locations, dateAdded, company});
                    return job
        }
    }
};

module.exports = resolvers;