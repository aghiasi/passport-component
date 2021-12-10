const passport = require('passport');
const User = require('../model/User');
const GoogleStrategy= require('passport-google-oauth20');
passport.serializeUser((user,done)=>{
 done(null,user.id);
});
passport.deserializeUser((id,done) => {
  User.findById(id).then(user=>{
   done(null,user);
  });
});
passport.use(new GoogleStrategy(
{
 //options for the google strat
 clientID:process.env.CLIENT_ID,
 clientSecret:process.env.CLIENT_SECRET,
 callbackURL:'/auth/google/redirect'
},
(accessToken,refreshToken,profile,done) => {
 //passport callback function
 //check user
 User.findOne({googleid:profile.id}).then((currentUser)=>{
  if(!currentUser){
  new User({
  username:profile.displayName,
  googleid:profile.id
 }).save().then((newUser)=>{
  console.log(newUser)
  done(null,newUser);
 })
  }else{
   console.log(currentUser)
   done(null,currentUser);
  }
 })
}
));