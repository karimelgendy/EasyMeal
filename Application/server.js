const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const restaurant=require('./routes/api/restaurant');
const reservation=require('./routes/api/reservation');
const user=require('./routes/api/user');

const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

// DB config
const db=require('./config/keys').mongoURI;

//Connect to mongo 
mongoose
     .connect(db)
     .then(()=> console.log('MongoDB Connected...'))
     .catch(err=> console.log(err));

     //Use routes
    app.use('/api/restaurant',restaurant);
    app.use('/api/reservation',reservation);
    app.use('/api/user',user);

     const port =process.env.PORT || 5000;
     app.listen(port, () => console.log(`Server started on ${port}`));