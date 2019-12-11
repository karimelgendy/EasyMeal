const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const restaurants=require('./routes/api/restaurants');
const reservations=require('./routes/api/reservations');
const users=require('./routes/api/users');

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
    app.use('/api/restaurants', restaurants);
    app.use('/api/reservations',reservations);
    app.use('/api/users',users);

    app.get('/',(req,res)=>{
         res.send("Welcome to homepage");
    })

     const port =process.env.PORT || 5000;
     app.listen(port, () => console.log(`Server started on ${port} Check`));
