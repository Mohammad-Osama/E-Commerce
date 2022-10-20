import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from 'next/server'


export default async function authCode(req: NextApiRequest ,res:NextApiResponse) {

    if (req.body.code ) {
        const code = req.body.code
        console.log("cccccccccc" , code )
        if (code === process.env.SECRET_CODE) {
            //  res.status(200).json("right code !")                          
          //  NextResponse.next() 
        } else {
            res.status(400).json("code doesn`t match")
        }
    }
    else {
        res.status(400).json("no code entered")
    }
}