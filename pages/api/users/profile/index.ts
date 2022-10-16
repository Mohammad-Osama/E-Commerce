import { NextApiRequest, NextApiResponse } from "next"
import mongoose from "mongoose"
import { authJwt, CustomRequest } from "../../../../middlewareFunctions/authMiddleware"
import clientPromise from "../../../../lib/db"


export default async function controller(req: NextApiRequest, res: NextApiResponse) {
 await clientPromise()
 await authJwt(req,res)
    try {
        // from authjwt middelware 
        const currentUser = ((req as CustomRequest).user)
        // console.log("ccccc" , currentUser)
        res.status(200).json(currentUser)
    } catch (error) {
        res.status(400).json(`Error==>${error}`);
    }

}