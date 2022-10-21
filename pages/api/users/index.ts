import { NextApiRequest, NextApiResponse } from "next"
import mongoose from "mongoose"
import { User, IUser } from "../../../models/userModel"
import clientPromise from "../../../lib/db"
import { authJwt, CustomRequest } from "../../../middlewareFunctions/authMiddleware"

export default async function controller(req: NextApiRequest, res: NextApiResponse) {
   await clientPromise()
   await authJwt(req, res)
   const currentUser = ((req as CustomRequest).user)
   const role = currentUser.role

   if (role === "admin") {
      try {
         const users  = await User.find()
                                  .select(['-password', '-__v' ])
         res.status(200).json(users)
      }

      catch (error) {
         res.status(400).json(`Error==>${error}`);
      }
   }
   else {
      res.status(400).json("not an admin");
   }


   /* try {
    
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
    } */
}