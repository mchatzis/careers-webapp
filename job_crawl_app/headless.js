const puppeteer = require('puppeteer');
const queryGPT = require('./gpt');
const { Job } = require('../backend/db-schema');

const promt = `
  Below you are given data from a company's careers webpage. Reformat the data into a json array.
  Each element of the output array must have only two attributes, one named title and one locations. 
  Group multiple locations into an array.
  Ignore remote data completely.
  Your response should include only the json array.

  Input data:\n
`;

const scrapeCompanies = async (companies) => {
  const failed = [];

  for (const company of companies){
    console.log("Starting scraping of ", company.name, ":")
    try{
      const {_, deletedCount} = await Job.deleteMany({company:company._id});
      console.log("\tDeleted ", deletedCount, " preexisting jobs.")
      let jobData = await scrapeCompany(company);
      let gptRes = await queryGPT(promt + jobData);
      let jobs = JSON.parse(gptRes);
      await insertJobsToDB(jobs, company);
      console.log("\tInserted ", jobs.length, " new jobs.")
    }
    catch (error) {
      console.log("Error while scraping " + company.name + ":\n", error.name, error.message)
      // console.trace(error); For debugging
      failed.push(company);
    }
  }

  return failed;
};

const scrapeCompany = async (company) => {
  const browser = await puppeteer.launch({
    headless: "new",
    args:[
      '--start-maximized'
   ]
  });

  let jobs;
  try{
    jobs = await extractJobs(browser, company);
    if (!jobs) {
      throw new Error("jobs extracted is empty/null/undefined")
    }
  }
  finally {
    await browser.close();
  }
  
  return jobs;
};

const extractJobs = async (browser, company) => {
  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on('request', request => {
    if (request.resourceType() === 'image' || request.resourceType() === 'media') {
      request.abort();
    } else {
      request.continue();
    }
  });

  await page.goto(company.url , { waitUntil: ['load', 'domcontentloaded'], timeout: 6000});
  await new Promise(r => setTimeout(r, 1000));

  // Accept cookies
  if (company.cookiesSelector){
    try{
      await Promise.all([ page.waitForNavigation({timeout: 4000}), page.click(company.cookiesSelector) ]);
    }
    catch (error) {
      let isTimeOutError = error instanceof puppeteer.TimeoutError;
      if (!isTimeOutError){
        throw error;
      }
    }
  }

  if (company.paginationSelector){
    await expandPagination(company.paginationSelector);
  }

  var jobsElem = await page.waitForSelector(company.jobsSelector);
  var jobsText = await jobsElem.evaluate(el => el.innerText);

  return jobsText;
};

async function expandPagination(paginationSelector, depth=0){
  if (depth > 100){
    throw new Error("expandPagination() recursion depth exceeded");
  }
  await page.click(paginationSelector);
  await expandPagination(paginationSelector, depth + 1);
};

const insertJobsToDB = async (jobs, company) => {
  await Promise.all(jobs.map(job => Job.create({
    title: job.title,
    locations: job.locations,
    dateAdded: Date.now(),
    company: company._id
  })));
}


module.exports = scrapeCompanies;