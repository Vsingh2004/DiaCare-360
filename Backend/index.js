require('dotenv').config();
const cors = require('cors');
const express = require('express');

// Routers
const userRouter = require('./routers/userRouter');
const productRouter = require('./routers/ProductRouter');
const articlesRouter = require('./routers/ArticlesRouter');
const geminiRouter = require('./routers/GeminiRouter'); 
const uploadRouter = require('./routers/uploadRouter')

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/articles', articlesRouter);
app.use('/gemini', geminiRouter); 
app.use('/api', uploadRouter)

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
