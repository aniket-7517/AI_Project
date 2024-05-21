const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

router.post('/voice', upload.single('audio'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const filePath = req.file.path;
    const apiKey = process.env.API_KEY;

    const openai = new OpenAI({
        apiKey: apiKey
    });

    try {
        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(filePath), 
            model: "whisper-1",
        });

        console.log(transcription.text);
        res.json({ message: 'File uploaded successfully', file: req.file, transcription: transcription.text });
    } catch (error) {
        console.error('Error transcribing audio:', error);
        res.status(500).json({ message: 'Error transcribing audio' });
    }
});




module.exports = router;