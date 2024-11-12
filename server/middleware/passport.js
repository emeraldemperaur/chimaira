const { Strategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../db_models/user');
require('dotenv').config();


const jwtOptions = {
    secretOrKey: process.env.DB_CODEX,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify = async(payload, done) => {
    try{
        const user = await User.findOne({where: {uuid: Buffer.from(payload.sub, 'hex').toString('utf8')}});
        if(!user){
            return done(null, false);
        }
        done(null, user);
    }catch(error){
        done(null, false);
    }
}

const jwtStrategy = new Strategy(jwtOptions, jwtVerify);

module.exports = { jwtStrategy }