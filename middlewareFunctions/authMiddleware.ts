import type { NextRequest } from 'next/server'
import jwt, { Secret } from "jsonwebtoken";
import { IUser, User } from "../models/userModel";
import type { NextApiRequest, NextApiResponse } from 'next'

interface TokenInterface {
    id: string;
    expiresIn: string;
}
export interface CustomRequest extends NextApiRequest {
    user: IUser | null
}
export async function authJwt(req: NextApiRequest , res :NextApiResponse) {
   
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token=req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as TokenInterface // any ?!
            (req as unknown as CustomRequest).user = await User.findById(decoded.id)
                .select(['-password',/* '-role',
                                                                 '-status', */
                    '-createdAt', '-updatedAt', '-__v'])
            //  console.log("ttttttttttt" , (req as CustomRequest).user)                                       
            //     NextResponse.next()
        } catch (error) {
            // console.log("eeeeeeeeeee" , error)
            res.status(401).json("Not authorized")
        }
    }
    else {
        throw new Error("no token")
    }

}