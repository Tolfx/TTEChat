import { Application, Router } from "express";
import EnsureAuth from "../Middlewares/EnsureAuth";

// @Tolfx
export default class MainRouter
{
    protected router: Router;
    protected app: Application;

    public constructor(
        app: Application,
    )
    {
        this.app = app;
        this.router = Router();

        this.app.use("/settings", this.router);

        this.router.get("/", EnsureAuth, (req, res) => {
            res.render("Settings/Index");
        });

        this.router.get("/profile-picture", EnsureAuth, (req, res) => {
            res.render("Settings/Profile_Picture");
        });

        this.router.get("/profile-name", EnsureAuth, (req, res) => {
            res.render("Settings/Profile_Name");
        });

        this.router.get("/profile-id", EnsureAuth, (req, res) => {
            res.render("Settings/Profile_Id");
        });
    }
}