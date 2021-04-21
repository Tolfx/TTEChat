import { Router } from "express";
import bcrypt from "bcryptjs";
import passport from "passport";
import User from "../Models/Users";
import { RandomTag } from "../Lib/Functions";
const router = Router();

router.get("/", (req, res) => {
    res.render("Home/Start");
});

router.get("/login", (req, res) => {
    res.render("Home/Start");
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

export default router;