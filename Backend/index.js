const express = require('express');

const bodyParser = require('body-parser');

const dotenv = require('dotenv');

const chatrouter = require('./Routes/chat.route');

const uploadRouter = require('./Routes/uploade.route');
const speechRouter = require('./Routes/textTiAudio.router');

const cors = require('cors')

const app = express();


app.use(cors());

app.use(express.static("public"));
app.use(bodyParser.json());

dotenv.config();

app.use('/', chatrouter);
app.use('/upload', uploadRouter);
app.use('/speech', speechRouter);

app.listen(3003, () => {
    console.log('Port no 3003')
})