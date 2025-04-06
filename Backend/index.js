
require('dotenv').config();

// import express
const express = require('express');
const userRouter = require('./routers/userRouter');

// initialize express
const app = express();

const port = process.env.PORT || 5000;

// middlewares
app.use('/user', userRouter);

// endpoint or route
app.get('/', (req, res) => {
    res.send("response from express")
})

// /add
app.get('/add', (req, res) => {
    res.send('response from add');
})

app.listen(port, () => {
    console.log('server started');
});  
