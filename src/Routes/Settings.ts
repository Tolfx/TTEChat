import { Application, Router } from "express";
import EnsureAuth from "../Middlewares/EnsureAuth";
import User from "../Models/Users";

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

        this.app.use("/settings", EnsureAuth, this.router);

        this.router.get("/", (req, res) => {
            res.render("Settings/Index");
        });

        this.router.post("/save", async (req, res) => {
            const { name, tag } = req.body;
            const ourSelf = await User.findOne(req.user);
            
            if(!ourSelf)
                return;

            if(name !== ourSelf.username)
            {
                ourSelf.username = name;
            }

            if(tag !== ourSelf.tag)
            {
                // Check if tag already in use
                const tagger = await User.findOne({ tag: tag });
                if(!tagger)
                {
                    ourSelf.tag = tag;
                }
                req.flash("error_msg", "Tag already in use");
            }

            await ourSelf.save();

            res.redirect("back");
        })
    }
}