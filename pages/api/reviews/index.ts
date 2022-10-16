import { NextApiRequest, NextApiResponse } from "next"
import mongoose from "mongoose"
import {IReview, Review } from "../../../models/reviewModel"
import {Product} from "../../../models/productModel"
import clientPromise from "../../../lib/db"


export default async function controller(req: NextApiRequest, res: NextApiResponse) {
    await clientPromise()
    if (req.method === 'POST') {
        try {
            const newReview: IReview = await Review.create({
                title: req.body.title,
                text: req.body.text,
                rating: req.body.rating,
                user: req.body.user,
                product: req.body.product,
            })
           await Product.findByIdAndUpdate(
            req.body.product ,
              { 
                $inc: { "rating_count" : 1 , 
                        "rating_total" : req.body.rating 
                      } 
              } 
             )
    
            res.status(201).json(newReview)
            }
      catch (error) {
         res.status(400).json(`Error==>${error}`);
      }
    }
    
     else {
        try {
            const reviews = await Review.find()

            res.status(200).json(reviews)

        } catch (error) {
            res.status(400).json(`Error==>${error}`);
        }
    }

}
