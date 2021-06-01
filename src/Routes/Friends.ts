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
                //req.flash("error_msg", "Didn't find a user with this tag");
                return res.json({
                    status: "error",
                    msg: "Didn't find a user with this tag"
                });
            }

            //@ts-ignore
            const isFriends = await Friends.findOne( { "googleIds.googleId": ourSelf.googleId, $and: [{ "googleIds.googleId": friend.googleId }] } )
    
            if(isFriends)
            {
                //req.flash("error_msg", "Already friends or still pending");
                return res.json({
                    status: "error",
                    msg: "Already friends or still pending"
                });
            }

            return new Friends({
                //@ts-ignore
                googleIds: [{ googleId: ourSelf.googleId, username: ourSelf.username}, { googleId: friend.googleId, username: friend.username}],
                sentId: ourSelf,
            }).save().then((e: any) => {
                //req.flash("success_msg", "Friend request sent");
                return res.json({
                    status: "success",
                    msg: "Friend request sent"
                });
            })
        });

        //@Tolfx
        this.router.post("/accept/:friendId", async (req, res) => {
            const friendId = req.params.friendId;
            const friend = await User.findOne( { googleId: friendId } );
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

            //@ts-ignore
            const isFriends = await Friends.findOne( { "googleIds.googleId": ourSelf.googleId, $and: [{ "googleIds.googleId": friend.googleId }] } )
    
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