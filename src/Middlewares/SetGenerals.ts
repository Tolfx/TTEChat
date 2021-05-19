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
        res.locals.Friends = await Friends.find({ googleIds: req.user.id, isFriends: true });
        //@ts-ignore
        const a = await Friends.find({ googleIds: req.user.id, pending: true })
        res.locals.PendingFriends = a;
    }

    res.locals.isAuth = req.isAuthenticated();

    //@ts-ignore
    res.locals.profilePicture = req.user?.profile_picture;
    //@ts-ignore
    res.locals.Name = req.user?.username;
    //@ts-ignore
    res.locals.Tag = req.user?.tag;
    //@ts-ignore
    res.locals.Id = req.user?._id;

    next();
}