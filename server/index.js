const express = require('express');
const dontenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authController = require('./controller/auth');

const app = express();
dontenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

app.post('/login', authController.login);

app.listen(process.env.PORT, () => {
  console.log(`server is on ${process.env.PORT}`);
});
