
require('dotenv').config();
const cors = require('cors');

// import express
const express = require('express');
const userRouter = require('./routers/userRouter');
const productRouter = require('./routers/ProductRouter');

// initialize express
const app = express();

const port = process.env.PORT || 5000;

// middlewares
app.use(cors({
    origin: '*'
}))
app.use(express.json());                                                  // This is a built-in middleware that parses incoming requests with JSON payloads.
app.use('/users', userRouter);
app.use('/products', productRouter);

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
