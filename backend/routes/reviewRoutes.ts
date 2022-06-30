import express from "express"
import { addReview, getReviewAggregate, getReviewByProduct, getReviewByUser, getReviewProductUser, getReviews } from "../controllers/reviewController"




const router = express.Router()

router.route('/')
                .get(getReviews)
                .post(addReview)

router.route('/product').get(getReviewByProduct)
router.route('/user').get(getReviewByUser)
router.route('/productuser').get(getReviewProductUser)
router.route('/reviewinfo').get(getReviewAggregate)



export = router