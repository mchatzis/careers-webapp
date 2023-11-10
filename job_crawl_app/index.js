const browseRevolut = require('./headless');
const queryGPT = require('./gpt')

async function main(){
    const jobData = await browseRevolut();

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

    console.log(jobsJson);
}


main();