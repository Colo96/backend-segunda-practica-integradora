const passport = require('passport');
const passportJWT = require('passport-jwt');
const SECRET_KEY = require('../constant/api.constant');
const { cookieExtractor } = require('../utils/utils');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: SECRET_KEY
}, async (jwt_payload, done) => {
    try {
        return done(null, jwt_payload);
    } catch (error) {
        return done(error);
    }
}));

module.exports = passport;