import crypto from "crypto";

/**
 * @Tolfx
 */
export async function RandomTag(): Promise<string>
{
    return new Promise((resolve, reject) => {
        crypto.randomBytes(6, (err, buf) => {
            if (err) {
                resolve("134231442")
            };

            resolve(buf.toString('hex'));
        });
    });
}