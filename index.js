const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

const {users,dishes} = require('./tempSeed');
const User = require('./models/user');
const Dish = require('./models/dish');

// db setup
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:auth/auth');
// mongoose.connect('mongodb://localhost:27017/auth/');
// app
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// server
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ', port);

// Dish.remove({}).then(()=>{
//         Dish.insertMany(dishes);
// });//remove all documents then insert our test data

// User.remove({}).then(()=>{
//         User.insertMany(users);
// })