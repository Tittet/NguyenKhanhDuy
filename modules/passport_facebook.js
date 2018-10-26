const passport = require("passport")
const FacebookStrategy = require("passport-facebook").Strategy;

var profile = passport.use(new FacebookStrategy({
    clientID: 344682549434669,
    clientSecret: 'b5062a8f68282c8c82ae9d118955d037',
    callbackURL:'http://localhost:3000',
    profileFields:['name','birthday','gender','email','id']
    },
    function(accessToken, refreshToken, profile, done){
        User.findOrCreate({id : profile.id, name: profile.name, birthday: profile.birthday, sex: profile.gender, email: profile.email}, function(err,user){
            return done(err,user);
        })
    })
)

// app = express();
var passport_sendfb = (app => {
    app.get("/auth/facebook",passport.authenticate('facebook'));
})
var passport_callbackfb = ( app =>{
    app.get("/auth/facebook/callback",passport.authenticate("facebook",{successRedirect:'/',failureRedirect:'/signup'}));
})


module.exports = {
    passport_sendfb : passport_sendfb,
    passport_callbackfb : passport_callbackfb,
    profileFields: profile
}