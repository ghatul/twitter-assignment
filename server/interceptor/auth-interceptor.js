const passport = require('passport');
const jwt = require('jwt-simple');
const mongoose = require('mongoose');
const BearerStrategy = require('passport-http-bearer').Strategy;
const mongoService = require('./../dataaccess/mongo.service');

class AuthInterceptor {

    constructor() {
        passport.use(new BearerStrategy(
            function (token, done) {
                var decoded = null;
                try {
                    decoded = jwt.decode(token, "krishghatul#@$#&(*0)%");
                } catch (e) {
                    var err = new Error();
                    err.message = "Invalid Token: " + e.message;
                    return done(err, false);
                }

                if (decoded.exp === undefined) {
                    console.log("its an unsub call");
                }
                else if (decoded.exp <= Date.now()) {
                    return done(null, false, {
                        message: 'Access token has expired'
                    });
                }

                const db = mongoService.getDbInstance();
                const id = mongoose.Types.ObjectId(decoded.id);
                db.collection('myusers').findOne({_id: id}, (err, user) => {
                    if (err) {
                        return done(err, null);
                    }
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                });
            }
        ));
    }

    requireAuth(req, res, next) {
        // if (!req.query.token && !req.body.token) {
        //     return res.send(401, {
        //         message: "An access token must be provided"
        //     });
        // }
        passport.authenticate('bearer', {session: false}, function(err, user, info) {
            if (err) return res.status(500).send(err);
           
            if (!user) {
                return res.send(401, {
                    message: "Access token has expired or is invalid"
                });
            }
            req.user = user;
            next();
        })(req, res, next);
    }

    issueToken(user) {
        var curDate = new Date();
        // expires in 60 days
        console.log("id ="+user.id);
        var expires = new Date(curDate.getTime() + (60*24*60*60*1000)); //(day*hr*min*sec*milisec)
        var token = jwt.encode({
            id: user.id, // issuer
            exp: expires.getTime(), // expiration time
            role: user.role
        },  "krishghatul#@$#&(*0)%");
        return token;
    }

}

module.exports = new AuthInterceptor();