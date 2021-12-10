require('dotenv').config();
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const profile = require('./routes/profile');
const authRoutes = require('./routes/auth-routes');
const mongoose = require('mongoose');
const passportSetup = require('./config/passport-setup');
const app = express();
mongoose.connect(process.env.DATA_BASE).then(result=>
app.listen(3000,() => {console.log('app is up ')})
).catch(error=>console.log(error));
app.set('view engine','ejs');
app.use(cookieSession({
 name:'jwt',
 maxAge:24*60*60*1000,
 keys:[process.env.COOKIE_KEY]
}));
//initailze passport 
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',authRoutes);
app.use('/profile',profile)
app.get('/',(req,res) => {
 res.render('home');
});

