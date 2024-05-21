const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const speechDir = path.resolve("./public");
const speechFile = path.join(speechDir, "speech.mp3");

router.post("/text", async (req, res) => {

    const apiKey = process.env.API_KEY;

    const openai = new OpenAI({
        apiKey: apiKey
    });

    const { voice, text } = req.body;

    const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: voice,
        input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);

    res.json({ success: true, filePath: "/speech.mp3" });
});

module.exports = router