import { Request, Response } from "express"
import { IReview, Review } from '../models/reviewModel'
import mongoose from "mongoose"


// get all reviews
export async function getReviews(req: Request, res: Response) {
    try {
        const reviews = await Review.find()

        res.status(200).json(reviews)

    } catch (error) {
        res.status(400).json(`Error==>${error}`);
    }

}


// new review 
export async function addReview(req: Request, res: Response) {
    try {
        const newReview: IReview = await Review.create({
            title: req.body.title,
            text: req.body.text,
            rating: req.body.rating,
            user: req.body.user,
            product: req.body.product,
        })

        res.status(201).json(newReview)

    } catch (error) {
        res.status(400).json(`Error==>${error}`);
    }

}

//get reviews by product id 
export async function getReviewByProduct(req: Request, res: Response) {
    try {
        const queryID = req.query.product as string
        const ObjectId = mongoose.Types.ObjectId
        const finalID = new ObjectId(queryID);
        const reviews = await Review.find({ product: finalID })

        res.status(200).json(reviews)
    } catch (error) {
        res.status(400).json(`Error==>${error}`);
    }

}

//get reviews by user id 
export async function getReviewByUser(req: Request, res: Response) {
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

//get a review by product id and user id , maybe not use it ??
export async function getReviewProductUser(req: Request, res: Response) {
    try {
        const queryIDproduct = req.query.product as string
        const queryIDuser = req.query.user as string
        const ObjectId = mongoose.Types.ObjectId
        const finalIDproduct = new ObjectId(queryIDproduct);
        const finalIDuser = new ObjectId(queryIDuser);

        const review = await Review.find(
            { product: queryIDproduct, user: finalIDuser }
        )

        res.status(200).json(review)
    } catch (error) {
        res.status(400).json(`Error==>${error}`);
    }

}


//aggregate to get first name and last name for the review from the users document
export async function getReviewAggregate(req: Request, res: Response) {
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
                {
                    first_name: 1,
                    last_name: 1,
                    title: 1,
                    text: 1,
                    rating: 1
                }
            }
        ])
        res.status(200).json(review)
    } catch (error) {
        res.status(400).json(`Error==>${error}`);
    }

}