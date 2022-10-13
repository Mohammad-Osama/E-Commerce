import { NextApiRequest, NextApiResponse } from "next"
import mongoose from "mongoose"
import { CustomRequest } from "../../../../middlewareFunctions/authMiddleware"


export async function controller(req: NextApiRequest, res: NextApiResponse) {

    try {
        // from authjwt middelware 
        const currentUser = ((req as CustomRequest).user)
        // console.log(currentUser)
        res.status(200).json(currentUser)
    } catch (error) {
        res.status(400).json(`Error==>${error}`);
    }

}