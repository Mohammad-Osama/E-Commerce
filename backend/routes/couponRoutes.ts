import express from "express"
import { addCoupon, getCoupons } from "../controllers/couponController"

import { authCode } from "../middleware/codeMiddleware"

const router = express.Router()

router.route("/")
                  .get(getCoupons)
                  .post(authCode,addCoupon)
            
export = router