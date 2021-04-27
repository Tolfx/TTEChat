import Users from "../Models/Users";
import { OAuth2Strategy } from "passport-google-oauth"
import { PORT, Google_Client_Id, Google_Client_Secret, HttpSchema, Domain } from "../Config";
import { RandomTag } from "../Lib/Functions";

/**
 * @Tolfx
 */
export default function GoogleAuth(passport: any)
{
    passport.use(new OAuth2Strategy({
        clientID: Google_Client_Id,
        clientSecret: Google_Client_Secret,
        callbackURL: `${HttpSchema}://${Domain}:${PORT}/oauth/google/callback`
      },
      (token, tokenSecret, profile, cb) => 
        {
            Users.findOne({ googleId: profile.id }, {}, {}, async (err, user) => {
                if(!user)
                {
                    new Users({
                        username: profile.displayName,
                        googleId: profile.id,
                        profile_picture: profile._json.picture ?? "",
                        tag: await RandomTag()
                    }).save().then((users) => {
                        return cb(err, users);
                    });
                }
                else
                    return cb(err, user);
            });
        }
    ));

    passport.serializeUser((user: any, done: any) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id: any, done: any) => {
        Users.findById(id, (err:any, user:any) => {
            done(err, user);
        });
    });
}