const scrapeProcessSave = require('./headless');
const { connect_db, disconnect_db }= require('../backend/db-connect');


const revolut = {
  name: 'Revolut',
  companyUrl: 'https://www.revolut.com/careers/',
  cookiesSelector: 'body > div:nth-child(5) > div > div > div.Box-rui__sc-1g1k12l-0.Flex-rui__sc-p3ay74-0.eOOyhv.joCZEa > button:nth-child(1)',
  jobsSelector: '#__next > main > section.Box-rui__sc-1g1k12l-0.sc-d85bbb3d-0.jHUjFU.cNPxDM > div > div.Box-rui__sc-1g1k12l-0.sc-2f63823-1.kVISKd.hfZcoP',
  // paginationSelector: '#__next > main > section.Box-rui__sc-1g1k12l-0.sc-d85bbb3d-0.jHUjFU.cNPxDM > div > div.Box-rui__sc-1g1k12l-0.sc-2f63823-1.kVISKd.hfZcoP > div.Box-rui__sc-1g1k12l-0.eyNBrd > a'
  paginationSelector: null
}

// section:nth-child(10): 10 will change when sections are added/removed
// could have multiple sections to cover all, however then jobsSelector should be an array
const monzo = {
  name: 'Monzo',
  companyUrl: 'https://monzo.com/careers/',
  cookiesSelector: '#__next > div.CookieBanner_CookieBanner__XY9ZB > div > div > div > button.Button_button__30ukX.Button_primary__RWocB.Button_center__53qAB',
  jobsSelector: '#mainContent > section:nth-child(9) > div > div > div',
  paginationSelector: null
}


async function main(){

  // const jobsJson = require('./gpt.json');
  // const job = jobsJson[0];
  // console.log(job);

  const companies = [
    revolut, 
    monzo
  ];
  await connect_db(process.env.DB_URI, process.env.DB_USERNAME, process.env.DB_PASSWORD);

  await scrapeProcessSave(companies);

  await disconnect_db();
}


main();