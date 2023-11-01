const { Schema, model } = require('mongoose');

const companySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Company.name required.']
    },
    url: {
        type: String,
        required: [true, 'Company.url required.']
    },
    pagination_url: String,
    jobs: [{
            type: Schema.Types.ObjectId,
            ref: 'Job'
        }]
}, {collection: 'companies'});

const jobSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Job.title required.']
    },
    location: {
        type: String,
        required: [true, 'Job.location required.']
    },
    date_added: {
        type: Date,
        required: [true, 'Job.date_added required.']
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: [true, 'Job.company required.']
    }
}, {collection: 'jobs'});

const Company = model('Company', companySchema);
const Job = model('Job', jobSchema);

module.exports = { Company, Job };