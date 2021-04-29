require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import expressLayout from "express-ejs-layouts";
import passport from "passport";
import flash from "connect-flash";
import method_override from "method-override";
import express_session from "express-session";
import { PORT, MongoDB_Auth } from "./Config"
import compileSass from "node-sass-middleware";
import GoogleAuth from "./Config/Google";

mongoose.connect(MongoDB_Auth, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = mongoose.connection;

/*
 * Import routes here
 */
import MainRoute from "./Routes/Main";
import OAuth2 from "./Routes/Oauth2";

/*
 * Const variables.
 */
const app = express();
GoogleAuth(passport);

app.use(expressLayout);
app.set('view engine', 'ejs');
app.use(
    compileSass({
        src: process.cwd()+"/sass", 
        dest: process.cwd()+"/public",
        outputStyle: 'compressed'
    })
);
app.use(express.static('public'));

app.use(method_override('_method'));

app.use(express.urlencoded({ extended: true }));

/**
 * Session for cookies etc.
 * 
 */
const sessionMiddleWare = express_session({
    secret: process.env.SESSION_SECRET ?? "",
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: "/",
        maxAge: 7*24*60*60*1000,
        domain: '',
        //secure: is_prod,
        sameSite: false,
    }
});

app.use(
    sessionMiddleWare
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
    res.locals.message = req.flash('message');
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');

    next();
});

new MainRoute(app);
new OAuth2(app);

app.listen(PORT, () => console.log(`Opened on port: ${PORT}`));