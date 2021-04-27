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

        this.app.use("/", this.router);

        this.router.get("/", EnsureAuth, (req, res) => {
            res.render("Home/Start");
        });
        
        this.router.get("/login", (req, res) => {
            if(req.isAuthenticated())
            {
                return res.redirect("/")
            }
            return res.render("Home/Start");
        });
        
        this.router.get('/logout', (req, res) => {
            req.logout();
            res.redirect('/login');
        });
    }
}