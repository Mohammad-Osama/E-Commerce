import { NextApiRequest, NextApiResponse } from "next"
import mongoose from "mongoose"
import {IReview, Review } from "../../../../models/reviewModel"
import clientPromise from "../../../../lib/db"

//aggregate to get first name and last name for the review from the users document
export default async function controller(req: NextApiRequest, res: NextApiResponse) {
    await clientPromise()
    try {
        const queryIDproduct = req.query.product as string
        const ObjectId = mongoose.Types.ObjectId
        const finalIDproduct = new ObjectId(queryIDproduct);
        const review = await Review.aggregate([
            {
                $match: {
                    product: finalIDproduct
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "revieweduser"
                }
            },
            {
                $replaceRoot:
                {
                    newRoot: {
                        $mergeObjects: [{
                            $arrayElemAt: ["$revieweduser", 0]
                        }, "$$ROOT"]
                    }
                }
            },
            {
                $project:
                {   _id : 0 ,
                    id : "$_id" ,
                    first_name: 1,
                    last_name: 1,
                    title: 1,
                    text: 1,
                    rating: 1,
                    updatedAt :1
                }
            }
        ])
        res.status(200).json(review)
     } catch (error) {
        res.status(400).json(`Error==>${error}`);
     }
}