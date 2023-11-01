const puppeteer = require('puppeteer');
const fs = require('fs')

async function browseRevolut(){

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', request => {
      if (request.resourceType() === 'image') {
        request.abort();
      } else {
        request.continue();
      }
    });

    await page.goto('https://www.revolut.com/careers/');
    console.log(page)

    const element = await page.waitForSelector('.Box-rui__sc-1g1k12l-0.sc-2f63823-1.kVISKd.hfZcoP');
    const html = await element.evaluate(el => el.innerText);
    fs.writeFile('innerHTML.html', html, ()=>{});

    await browser.close();
}

browseRevolut();