import { Request, Response, NextFunction } from "express";
import Friends from "../Models/Friends";

/**
 * @Tolfx
 */
export default async function SetGenerals(req: Request, res: Response, next: NextFunction)
{
    if(req.isAuthenticated())
    {
        //@ts-ignore
        res.locals.Friends = await Friends.find({ googleIds: req.user, isFriends: true });
        //@ts-ignore
        const a = ((await Friends.find({ googleIds: req.user, pending: true }))
        .map(e => {
            const o = e.googleIds.map(a => a.googleId !== req.user.googleId);
            console.log(o)
            return o
        }))
        console.log(a)
        res.locals.PendingFriends = a;
    }

    res.locals.isAuth = req.isAuthenticated();

    //@ts-ignore
    res.locals.profilePicture = req.user?.profile_picture;
    //@ts-ignore
    res.locals.Name = req.user?.username
    //@ts-ignore
    res.locals.Tag = req.user?.tag

    next();
}