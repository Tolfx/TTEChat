import { Application, Router } from "express";
import EnsureAuth from "../Middlewares/EnsureAuth";

// @Tolfx
export default class FriendsRoute
{
    protected router: Router;
    protected app: Application;

    public constructor(
        app: Application,
    )
    {
        this.app = app;
        this.router = Router();

        this.app.use("/friends", EnsureAuth, this.router);

        this.router.get("/", (req, res) => {
            res.render("Friends/Index");
        });
    }
}