import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../Models/Users";

export default function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        // Match user
        User.findOne({
            email: email,
        }).then((user) => {

            if (!user) {
            return done(null, false, { message: 'Email is not registered' });
            }

            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
            });
        });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};