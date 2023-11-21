const scrapeProcessSave = require('./headless');
const { connect_db, disconnect_db }= require('../backend/db-connect');
const { Company } = require('../backend/db-schema');


async function main(){
  await connect_db(process.env.DB_URI, process.env.DB_USERNAME, process.env.DB_PASSWORD);

  const companies = await Company.find().exec();
  let attempts = 0;
  let toBeScraped = companies;
  while(toBeScraped.length !== 0 && attempts < 3){
    console.log("Currently on attempt ", attempts + 1, " of scraping.")
    toBeScraped = await scrapeProcessSave(toBeScraped);
    attempts++;
  }

  await disconnect_db();
}


main();