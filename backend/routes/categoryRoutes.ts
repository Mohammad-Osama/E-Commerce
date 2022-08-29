import express from "express"
import { getCategories , addCategory  }
  from "../controllers/categoryController"
import { authCode } from "../middleware/codeMiddleware"


const router = express.Router()

router.route("/").get(getCategories).post(authCode, addCategory)
// router.route("/:id").put(updateProduct).delete(deleteProduct)



export = router