require('dotenv').config();
const cors = require('cors');
const express = require('express');

// Routers
const userRouter = require('./routers/userRouter');
const productRouter = require('./routers/ProductRouter');
const orderRouter = require('./routers/OrderRouter');
const articlesRouter = require('./routers/ArticlesRouter');
const geminiRouter = require('./routers/GeminiRouter'); 

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/articles', articlesRouter);
app.use('/gemini', geminiRouter); 

// Test routes
app.get('/', (req, res) => {
  res.send("response from express")
});

app.get('/add', (req, res) => {
  res.send('response from add');
});

app.listen(port, () => {
  console.log('server started');
});
