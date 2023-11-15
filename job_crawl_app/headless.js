const puppeteer = require('puppeteer');

class RecursionDepthError extends Error{
  constructor(message){
    super(message);
    this.name = 'RecursionDepthError';
  }
}

const crawl = async (company) => {

  return await extractJobs(company);
}

const extractJobs = async ({ companyUrl, cookieSelector, jobsSelector, paginationSelector }) => {

    const browser = await puppeteer.launch({
      headless: false,
      args:[
        '--start-maximized'
     ]});
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', request => {
      if (request.resourceType() === 'image' || request.resourceType() === 'media') {
        request.abort();
      } else {
        request.continue();
      }
    });

    await page.goto(companyUrl , { waitUntil: ['load', 'domcontentloaded'], timeout: 6000});
    await new Promise(r => setTimeout(r, 1000));

    // Accept cookies
    try{
      await Promise.all([ page.waitForNavigation({timeout: 4000}), page.click(cookieSelector) ]);
    }
    catch (error) {
      let isTimeOutError = error instanceof puppeteer.TimeoutError;
      if (!isTimeOutError){
        throw error;
      }
    }

    async function expandPagination(depth=0){
      try {
        if (depth > 100){
          throw new RecursionDepthError("expandPagination() recursion depth exceeded");
        }
        await page.click(paginationSelector);
        await expandPagination(depth + 1);
      }
      catch (error) {
        if (error instanceof RecursionDepthError){
          console.log(error.name, error.message)
          throw new error;
        }
      }
    };
    if (paginationSelector){
      await expandPagination();
    }


    var jobsElem = await page.waitForSelector(jobsSelector);
    var jobsText = await jobsElem.evaluate(el => el.innerText);

    await browser.close();

    return jobsText;
  }


module.exports = crawl;