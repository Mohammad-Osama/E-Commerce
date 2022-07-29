import express from "express"
import { getBrands , addBrand  }
  from "../controllers/brandController"
import { authCode } from "../middleware/codeMiddleware"


const router = express.Router()

router.route("/").get(getBrands).post(authCode, addBrand)
// router.route("/:id").put(updateProduct).delete(deleteProduct)



export = router