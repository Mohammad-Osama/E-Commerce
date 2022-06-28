import express from "express"
import { addReview, getReviewByProduct, getReviewByUser, getReviewProductUser, getReviews } from "../controllers/reviewController"




const router = express.Router()

router.route('/')
                .get(getReviews)
                .post(addReview)

router.route('/product').get(getReviewByProduct)
router.route('/user').get(getReviewByUser)
router.route('/productuser').get(getReviewProductUser)



export = router