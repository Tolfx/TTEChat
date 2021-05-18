//@Tolfx

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
import { Server } from "http"

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
import SocketIo from "./Socket/Sockets";
import SettingRouter from "./Routes/Settings";
import FriendsRoute from "./Routes/Friends";
import ChatRouter from "./Routes/Chat";

/*
 * Const variables.
 */
const app = express();
const server = new Server(app)
const io = (new SocketIo(server)).io;
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

    res.locals.isAuth = req.isAuthenticated();

    //@ts-ignore
    res.locals.profilePicture = req.user?.profile_picture;

    next();
});

//@Tolfx
new MainRoute(app, io);
//@Tolfx
new SettingRouter(app);
//@Tolfx
new FriendsRoute(app, io);
//@Tolfx
new ChatRouter(app, io);
//@Tolfx
new OAuth2(app);

server.listen(PORT, () => console.log(`Opened on port: ${PORT}`));