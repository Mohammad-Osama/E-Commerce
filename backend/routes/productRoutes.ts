import express from "express"
import {getProducts ,
        addProduct , 
        updateProduct ,
        deleteProduct   }
      from "../controllers/productController"


const router = express.Router()

router.route("/").get(getProducts).post(addProduct)
router.route("/:id").put(updateProduct).delete(deleteProduct)



export = router