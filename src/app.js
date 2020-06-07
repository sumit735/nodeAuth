// includes
const express = require('express');
require('./db/mongoose');

const userRouter = require('./routers/user');

// creating new express app
const app = express();


// get json sent from clients
app.use(express.json());
app.use(userRouter);

module.exports = app;