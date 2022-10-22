import { NextApiRequest, NextApiResponse } from "next"
import mongoose from "mongoose"
import {IReview, Review } from "../../../../models/reviewModel"


export async function controller(req: NextApiRequest, res: NextApiResponse) {
    try {
        const queryID = req.query.user as string
        const ObjectId = mongoose.Types.ObjectId
        const finalID = new ObjectId(queryID);
        const reviews = await Review.find({ user: finalID })

        res.status(200).json(reviews)
     } catch (error) {
        res.status(400).json(`Error==>${error}`);
     }
}