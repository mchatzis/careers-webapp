const { Schema, model } = require('mongoose');

const companySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Company.name required.'],
        unique: true
    },
    url: {
        type: String,
        required: [true, 'Company.url required.']
    },
    jobsSelector: {
        type: String,
        required: [true, 'Company.jobsSelector required.']
    },
    cookiesSelector: String,
    paginationSelector: String,
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
    locations: {
        type: [String],
        required: [true, 'Job.location required.']
    },
    dateAdded: {
        type: Date,
        required: [true, 'Job.dateAdded required.']
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