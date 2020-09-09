const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../model/user');


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET_KEY,
    callbackURL: process.env.GOOGLE_LOGIN_ADRESS
  },
  (accessToken, refreshToken, profile, done) => {
    const data = profile._json;
    console.log(data);

    User.findOrCreate({
        'googleId' : data.id
    }, 
    {
        name: data.given_name,
        surname: data.family_name,
        ProfilePhoto: data.picture
    }, (err, user) => {
        return done(err, user)
    }
    );
  }
));

passport.serializeUser((user, done)=>  {
    done(null, user.id);
});
   
passport.deserializeUser((id, done) => {
    User.findById(id,  (err, user) => {
      done(err, user);
    });
});

module.exports = passport