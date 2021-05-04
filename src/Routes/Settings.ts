import { Application, Router } from "express";
import EnsureAuth from "../Middlewares/EnsureAuth";

// @Tolfx
export default class SettingRouter
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
    }
}