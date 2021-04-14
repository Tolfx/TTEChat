require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import expressLayout from "express-ejs-layouts";
import passport from "passport";
import flash from "connect-flash";
import method_override from "method-override";
import express_session from "express-session";

const app = express();

app.use(expressLayout);
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(method_override('_method'));

app.use(express.urlencoded({ extended: true }));

let sessionMiddleWare = express_session({
    secret: process.env.SESSION_SECRET ?? "",
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: "/",
        maxAge: 24*60*60*1000,
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

app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Hello world"
    });
});

app.listen(3000, () => console.log("Open and clear"));