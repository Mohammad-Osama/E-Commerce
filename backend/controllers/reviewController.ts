import {Request,Response} from "express"
import {IReview, Review} from '../models/reviewModel'

// get all reviews
export async function getReviews(req :Request , res : Response)  {
    try {
        const reviews  = await Review.find()
 
        res.status(200).json(reviews)

    } catch (error) {
        res.status(400).json(`Error==>${error}`);
    }
   
  }


  // new review 
export async function addReview(req :Request , res : Response)  {
    try {
        const newReview : IReview = await Review.create({
            title: req.body.title ,  
            text: req.body.text ,  
            rating: req.body.rating , 
            user: req.body.user,
            product: req.body.product,
          })
      
         res.status(201).json(newReview)

    } catch (error) {
        res.status(400).json(`Error==>${error}`);
    }
    
}