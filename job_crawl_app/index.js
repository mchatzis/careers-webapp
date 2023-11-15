const crawl = require('./headless');
const queryGPT = require('./gpt');

async function main(){
    const revolut = {
        companyUrl: 'https://www.revolut.com/careers/',
        cookieSelector: 'body > div:nth-child(5) > div > div > div.Box-rui__sc-1g1k12l-0.Flex-rui__sc-p3ay74-0.eOOyhv.joCZEa > button:nth-child(1)',
        jobsSelector: '#__next > main > section.Box-rui__sc-1g1k12l-0.sc-d85bbb3d-0.jHUjFU.cNPxDM > div > div.Box-rui__sc-1g1k12l-0.sc-2f63823-1.kVISKd.hfZcoP',
        // paginationSelector: '#__next > main > section.Box-rui__sc-1g1k12l-0.sc-d85bbb3d-0.jHUjFU.cNPxDM > div > div.Box-rui__sc-1g1k12l-0.sc-2f63823-1.kVISKd.hfZcoP > div.Box-rui__sc-1g1k12l-0.eyNBrd > a'
        paginationSelector: null
      }

    const monzo = {
        companyUrl: 'https://monzo.com/careers/',
        cookieSelector: '#__next > div.CookieBanner_CookieBanner__XY9ZB > div > div > div > button.Button_button__30ukX.Button_primary__RWocB.Button_center__53qAB',
        jobsSelector: '#mainContent > section:nth-child(9) > div > div > div',
        // paginationSelector: ''
        paginationSelector: null
      }
      const jobData = await crawl(monzo);
    // console.log(jobData)


    const query = `
        Below you are given data from a company's careers webpage. Reformat the data into a json array.
        Each element of the array must have only two attributes, one named title and one locations. 
        Group multiple locations into an array.
        Ignore remote data completely.
        Your response should include only the json.

        Input data:
        ${jobData}
    `
    const gptRes = await queryGPT(query);
    const jobsJson = JSON.parse(gptRes);

    

    // const jobsJson = require('./gpt.json');
    console.log(jobsJson)


}


main();