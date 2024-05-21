const OpenAI = require("openai");

const express = require('express');

const router = express();

const dotenv = require('dotenv');

dotenv.config();

router.post('/chat', async (req, res) => {

    const apiKey = process.env.API_KEY;

    const openai = new OpenAI({
        apiKey: apiKey
    });

    try {
        const { prompt } = req.body;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        res.send(response.choices[0].message.content)

    } catch (err) {
        res.send(err);
    }

})

router.post('/image', async (req, res) => {

    const apiKey = process.env.API_KEY;

    const openai = new OpenAI({
        apiKey: apiKey
    });

    try {
        const { prompt } = req.body;

        const image = await openai.images.generate({ model: "dall-e-2", prompt: prompt });

        console.log(image);
        res.send(image)

    } catch (err) {
        res.send(err);
    }
})

router.post('/grammer', async (req, res) => {

    const apiKey = process.env.API_KEY;

    const openai = new OpenAI({
        apiKey: apiKey
    });

    try {
        const { prompt } = req.body;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature: 0,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,

        });
        res.send(response.choices[0].message.content)

    } catch (err) {
        res.send(err);
    }
})

router.post('/translate', async (req, res) => {

    const apiKey = process.env.API_KEY;

    const openai = new OpenAI({
        apiKey: apiKey
    });

    try {
        const { prompt } = req.body;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                "role": "system",
                "content": "You will be provided with a sentence in English, and your task is to translate it into marathi."
              },
              {
                "role": "user",
                "content": prompt
              }
            ],
            temperature: 0,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          });
        res.send(response.choices[0].message.content)

    } catch (err) {
        res.send(err);
    }
})

module.exports = router;