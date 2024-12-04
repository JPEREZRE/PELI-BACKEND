const express = require('express')
const {getconection} = require ('./db/db-connect-mongo')
const cors = require('cors');
require('dotenv').config();

const app = express()
const port = process.env.PORT;

app.use(cors());

getconection();

app.use(express.json());

app.use('/director', require('./router/director'));
app.use('/productora', require('./router/productora'));
app.use('/genero', require('./router/genero'));
app.use('/tipo', require('./router/tipo'));
app.use('/media', require('./router/media'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})