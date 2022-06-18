import express from "express"
import { getBrands , addBrand  }
  from "../controllers/brandController"


const router = express.Router()

router.route("/").get(getBrands).post(addBrand)
// router.route("/:id").put(updateProduct).delete(deleteProduct)



export = router