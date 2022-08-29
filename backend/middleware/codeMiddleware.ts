import { NextFunction, Request, Response } from "express"


export async function authCode(req: Request, res: Response, next: NextFunction) {

    if (req.body.code) {
        const code = req.body.code
        if (code === process.env.SECRET_CODE) {
            //  res.status(200).json("right code !")                          
            next()
        } else {
            res.status(400).json("code doesn`t match")
        }
    }
    else {
        res.status(400).json("no code entered")
    }
}