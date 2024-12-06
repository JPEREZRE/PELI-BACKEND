const express = require('express');
const {getconection} = require ('./db/db-connect-mongo');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

getconection();

app.use(express.json());

app.use('/login', require('./router/auth'));
app.use('/usuario', require('./router/usuario'));
app.use('/director', require('./router/director'));
app.use('/productora', require('./router/productora'));
app.use('/genero', require('./router/genero'));
app.use('/tipo', require('./router/tipo'));
app.use('/media', require('./router/media'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})