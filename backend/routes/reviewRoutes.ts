import express from "express"
import { addReview, getReviews } from "../controllers/reviewController"




const router = express.Router()

router.route('/')
                .get(getReviews)
                .post(addReview)



                
export = router