import express from "express"
import { getCategories , addCategory  }
  from "../controllers/categoryController"


const router = express.Router()

router.route("/").get(getCategories).post(addCategory)
// router.route("/:id").put(updateProduct).delete(deleteProduct)



export = router