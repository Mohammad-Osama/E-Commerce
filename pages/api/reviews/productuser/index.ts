import { NextApiRequest, NextApiResponse } from "next"
import mongoose from "mongoose"
import {IReview, Review } from "../../../../models/reviewModel"
import clientPromise from "../../../../lib/db"

//get a review by product id and user id , maybe not use it ??
export default async function controller(req: NextApiRequest, res: NextApiResponse) {
    await clientPromise()
    try {
        const queryIDproduct = req.query.product as string
        const queryIDuser = req.query.user as string
        const ObjectId = mongoose.Types.ObjectId
        const finalIDproduct = new ObjectId(queryIDproduct);
        const finalIDuser = new ObjectId(queryIDuser);

        const review = await Review.find(
            { product: queryIDproduct, user: finalIDuser }
        )
        const returndData = await review[0]
        res.status(200).json(returndData)
     } catch (error) {
        res.status(400).json(`Error==>${error}`);
     }
}