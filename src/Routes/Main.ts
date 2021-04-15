import { Router } from "express";
import bcrypt from "bcryptjs";
import passport from "passport";
import User from "../Models/Users";
import { RandomTag } from "../Lib/Functions";
const router = Router();

router.get("/", (req, res) => {
    res.render("Home/Start");
});

router.get("/register", (req, res) => {
    res.render("Home/Register");
});

router.get("/login", (req, res) => {
    res.render("Home/Login");
});

router.post("/register", async (req, res) => {
    let { email, password, password_repeat, username } = req.body;
    let errors = [];

    if(!email)
    {
        errors.push({
            msg: "Please insert an email.",
        });
    }

    if(!password)
    {
        errors.push({
            msg: "You need a password to register.",
        });
    }

    if(!username)
    {
        errors.push({
            msg: "Please pick a username.",
        });
    }

    if(!password_repeat)
    {
        errors.push({
            msg: "Please repeat your password.",
        });
    }

    if(password_repeat !== password)
    {
        errors.push({
            msg: "Password didn't match, try again.",
        });
    }

    // We got errors?
    if(errors.length > 0)
    {
        return res.render("Home/Register", {
            errors
        });
    }
    else
    {
        /*
         * Check if user email is already registered
         */
        let User_Exist = await User.findOne({ email: email });
        if(User_Exist)
        {
            errors.push({
                msg: "An user has already registered this email."
            });

            return res.render("Home/Register", {
                errors
            });
        }
        else
        {
            /*
             * Proceed to create account.
             */
            bcrypt.genSalt(10, (err, salt) => {
                if(err)
                {
                    req.flash("error_msg", "Something went wrong.");
                    return res.redirect("/register");
                }

                bcrypt.hash(password, salt, async (err, hash) => {
                    if(err)
                    {
                        req.flash("error_msg", "Something went wrong.");
                        return res.redirect("/register");
                    }

                    new User({
                        username: username,
                        password: hash,
                        email: email,
                        tag: await RandomTag()
                    }).save().then(() => {
                        res.redirect("/login")
                    }).catch(() => {
                        req.flash("error_msg", "Something went wrong.")
                        return res.redirect("/register")
                    });
                });
            });
        };
    };
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

export default router;