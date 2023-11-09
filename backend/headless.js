const puppeteer = require('puppeteer');
const fs = require('fs')

class RecursionDepthError extends Error{
  constructor(message){
    super(message);
    this.name = 'RecursionDepthError';
  }
}

async function browseRevolut(){

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', request => {
      if (request.resourceType() === 'image' || request.resourceType() === 'media') {
        request.abort();
      } else {
        request.continue();
      }
    });

    await page.goto('https://www.revolut.com/careers/', { waitUntil: ['load', 'domcontentloaded', 'networkidle0'], timeout: 10000});

    // Accept cookies
    const cookieSelector = 'body > div:nth-child(5) > div > div > div.Box-rui__sc-1g1k12l-0.Flex-rui__sc-p3ay74-0.eOOyhv.joCZEa > button:nth-child(1)';
    await Promise.all([ page.click(cookieSelector), page.waitForNavigation()]);

    const paginationSelector = '#__next > main > section.Box-rui__sc-1g1k12l-0.sc-d85bbb3d-0.jHUjFU.cNPxDM > div > div.Box-rui__sc-1g1k12l-0.sc-2f63823-1.kVISKd.hfZcoP > div.Box-rui__sc-1g1k12l-0.eyNBrd > a';
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
    await expandPagination();

    const jobsSelector = '#__next > main > section.Box-rui__sc-1g1k12l-0.sc-d85bbb3d-0.jHUjFU.cNPxDM > div > div.Box-rui__sc-1g1k12l-0.sc-2f63823-1.kVISKd.hfZcoP';
    var element2 = await page.waitForSelector(jobsSelector);
    var html2 = await element2.evaluate(el => el.innerText);
    // fs.writeFile('innerHTML2.html', html2, ()=>{});

    await browser.close();
}

browseRevolut();