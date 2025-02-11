const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const fetchProfile = require('./utils/fetchProfile');

const whoopOAuthConfig = {
    authorizationURL: `${process.env.WHOOP_API_HOSTNAME}/oauth/oauth2/auth`,
    tokenURL: `${process.env.WHOOP_API_HOSTNAME}/oauth/oauth2/token`,
    clientID: process.env.WHOOP_CLIENT_ID,
    clientSecret: process.env.WHOOP_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    state: true,
    scope: ['offline', 'read:profile'],
};

const getUser = async (accessToken, refreshToken, { expires_in }, profile, done) => {
    const user = {
        accessToken,
        refreshToken,
        expiresAt: Date.now() + expires_in * 1000,
        userId: profile.user_id,
        firstName: profile.first_name,
        lastName: profile.last_name,
    };
    done(null, user);
};

const whoopStrategy = new OAuth2Strategy(whoopOAuthConfig, getUser);
whoopStrategy.userProfile = fetchProfile;
passport.use('withWhoop', whoopStrategy);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
