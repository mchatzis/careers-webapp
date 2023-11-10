const OpenAI = require('openai');

const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });

const queryGPT = async (promt) => {
    const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: promt }],
        model: 'gpt-3.5-turbo',
    });
    
    return chatCompletion.choices[0].message.content;
}


module.exports = queryGPT;