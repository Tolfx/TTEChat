import { Application, Router } from "express";
import passport from "passport";

export default class OAuth2
{
    protected router: Router;
    protected app: Application;

    public constructor(
        app: Application,
    )
    {
        this.app = app;
        this.router = Router();

        this.app.use(this.router);

        this.router.get("/oauth/google", passport.authenticate("google", {
            scope: ['profile']
        }));

        this.router.get("/oauth/google/callback", 
            passport.authenticate('google', { failureRedirect: '/login' }),
                (req, res) => {
                    res.redirect('/');
                }
        );
    }
}