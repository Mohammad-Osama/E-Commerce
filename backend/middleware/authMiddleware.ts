import {NextFunction, Request,Response} from "express"
import jwt, { Secret } from "jsonwebtoken";
import { IUser, User } from "../models/userModel";

 interface TokenInterface {
       id: string;
       expiresIn: string;
  }
  export interface CustomRequest extends Request {
    user: IUser|null
   }
export async function authJwt(req :Request , res : Response , next :NextFunction){

    if (req.body.authorization && req.body.authorization.startsWith('Bearer'))
        {
            try {
                const token=req.body.authorization.split(' ')[1]

                const decoded = jwt.verify(token,process.env.JWT_SECRET as Secret) as TokenInterface // any ?!
                (req as CustomRequest).user  = await User.findById(decoded.id).select('-password') 
                next()
            } catch (error) {
                console.log(error)
                res.status(401).json("Not authorized")
            }
            
        }
        else 
        {
            res.status(401).json("no token")
        }
    

}