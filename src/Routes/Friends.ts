import { Application, Router } from "express";
import EnsureAuth from "../Middlewares/EnsureAuth";
import { Server } from "socket.io";
import User from "../Models/Users";

// @Tolfx
export default class FriendsRoute
{
    protected router: Router;
    protected app: Application;
    protected io: Server;

    public constructor(
        app: Application,
        io: Server
    )
    {
        this.app = app;
        this.router = Router();
        this.io = io;

        this.app.use("/friends", EnsureAuth, this.router);

        this.router.get("/", (req, res) => {
            res.render("Friends/Index");
        });

        //@Tolfx
        this.router.post("/add/:friendTag", async (req, res) => {
            const friendId = req.params.friendTag;
            
            // Check if user exists?
            const friend = await User.findOne( { tag: friendId } );
            if(!friend)
            {
                return;
            }

            
        });
    }
}