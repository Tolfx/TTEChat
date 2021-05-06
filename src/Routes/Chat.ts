import { Application, Router } from "express";
import EnsureAuth from "../Middlewares/EnsureAuth";
import { Server } from "socket.io";

// @Tolfx
export default class ChatRouter
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

        this.app.use("/chat", EnsureAuth, this.router);

        this.router.get("/", (req, res) => {
            res.render("Chat/Index");
        });
    }
}