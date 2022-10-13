import { NextApiRequest, NextApiResponse } from "next"
import mongoose from "mongoose"
import {User, IUser} from "../../../models/userModel"
import { CustomRequest } from "../../../middlewareFunctions/authMiddleware"


export async function controller(req: NextApiRequest, res: NextApiResponse) {
    try {
       // from authjwt middelware 
    const currentUser = ((req as CustomRequest).user)
    if (currentUser?.role === "admin") {
     const users  = await User.find().select(['-password', '-__v' ])
     res.status(200).json(users)
    }
    else {
      res.status(400).json("Not authorized user")
    }

     } catch (error) {
        res.status(400).json(`Error==>${error}`);
     }
}