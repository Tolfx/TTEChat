import { Request, Response, NextFunction } from "express";
import Friends from "../Models/Friends";
import User from "../Models/Users";

/**
 * @Tolfx
 */
export default async function SetGenerals(req: Request, res: Response, next: NextFunction)
{
    if(req.isAuthenticated())
    {
        //@ts-ignore
        const friends = await Friends.find({ "googleIds.googleId": req.user.googleId, isFriends: true });
        const f = friends.map(e => {
            return e.googleIds.filter(a => {
                if(a.googleId != req.user.googleId)
                {
                    return a.googleId
                }
            })
        })
        let a = [];
        f.forEach(async b => {
            const friend = await User.findOne({ googleId: b[0].googleId });
            a.push(friend);
        })
        res.locals.Friends = a;
        //@ts-ignore
        res.locals.PendingFriends = await Friends.find({ "googleIds.googleId": req.user.googleId, pending: true });
    }

    res.locals.isAuth = req.isAuthenticated();

    //@ts-ignore
    res.locals.profilePicture = req.user?.profile_picture;
    //@ts-ignore
    res.locals.Name = req.user?.username;
    //@ts-ignore
    res.locals.Tag = req.user?.tag;
    //@ts-ignore
    res.locals.googleId = req.user?.googleId;

    next();
}