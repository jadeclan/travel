const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes'); 
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express(); 

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser()); 

// view engine
app.set('view engine', 'ejs');

//Connect to MongoDB
const dbName = 'travel';
const dbURI = 'mongodb://localhost:27017/' + dbName;
mongoose.connect(dbURI)
  .then (console.clear())
  .then ((result) => { 
    console.log('Connected to the db - PHEW - ....');
    // Listen for requests
    app.listen(3000);})
  .catch ((err) => console.log(err)); 

// routes 
app.get('*', checkUser);// checkUser gets applied to every GET route.
app.get('/', (req, res) => res.render('home'));
app.get('/islands', requireAuth, (req, res) => res.render('islands'));
app.use(authRoutes);