require('dotenv').config({
    path: `${__dirname}/.env`
});

const { v4: uuidv4 } = require('uuid');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const config = require('/config');
const { logger } = require('./utils');
const { Post } = require('./models');
const { postRouter } = require('./routes');

app.use(express.json());
app.use('/posts', postRouter);

// const uri = 'mongodb://localhost:27017/junocollege';
const uri = config.DATABASE_URL;

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => {
    // console.log(`Successfull connected to: ${uri}`);
    // console.log(`Successfull connection`);
})
.catch((err) => {
    console.error(`Failed to connect: ${uri}`);
    console.error(err);
});

app.listen(config.PORT, () => {
    console.log(`API Server Listening on port ${config.PORT}...`);
});







