import { Application, Router } from "express";
import EnsureAuth from "../Middlewares/EnsureAuth";
import { Server } from "socket.io";
import User from "../Models/Users";
import Friends from "../Models/Friends";

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
            return res.render("Friends/Index");
        });

        //@Tolfx
        this.router.post("/add/:friendTag", async (req, res) => {
            const friendId = req.params.friendTag;
            
            const friend = await User.findOne( { tag: friendId } );
            //@ts-ignore
            const ourSelf = req.user
            // Check if user exists?
            if(!friend)
            {
                req.flash("error_msg", "Didn't find a user with this tag");
                return res.redirect("back");
            }

            const isFriends = await Friends.findOne( { googleIds: ourSelf, $and: [{ googleIds: friend }] } )
    
            if(isFriends)
            {
                req.flash("error_msg", "Already friends or still pending");
                return res.redirect("back");
            }

            return new Friends({
                //@ts-ignore
                googleIds: [ourSelf.googleId, friend.googleId],
                sentId: ourSelf,
            }).save().then((e: any) => {
                req.flash("success_msg", "Friend request sent");
                res.render("Friends/Index");
            })
        });

        //@Tolfx
        this.router.post("/accept/:friendTag", async (req, res) => {
            const friendId = req.params.friendTag;
            const friend = await User.findOne( { tag: friendId } );
            //@ts-ignore
            const ourSelf = req.user
            if(!ourSelf)
                return;

            // Check if user exists?
            if(!friend)
            {
                req.flash("error_msg", "Didn't find a user with this tag");
                return res.redirect("back");
            }

            const isFriends = await Friends.findOne( { googleIds: ourSelf, $and: [{ googleIds: friend }] } )
    
            if(!isFriends)
            {
                req.flash("error_msg", "No friend request to accept");
                return res.redirect("back");
            }

            //@ts-ignore
            if(isFriends.sentId === ourSelf.id)
            {
                req.flash("error_msg", "You can't accept your own friend request");
                return res.redirect("back");
            }

            isFriends.isFriends = true;
            isFriends.pending = false;

            await isFriends.save();

            req.flash("success_msg", "Friend request accepeted");
            return res.redirect("back");
        });
    }
}