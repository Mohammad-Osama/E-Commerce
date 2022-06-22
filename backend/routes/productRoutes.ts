import express from "express"
import {getProducts ,
        addProduct , 
        updateProduct ,
        deleteProduct,   
        searchProducts}
      from "../controllers/productController"


const router = express.Router()

router.route("/")
                  .get(getProducts)
                  .post(addProduct)
                  .get(searchProducts)

router.route("/:id")
                  .put(updateProduct)
                  .delete(deleteProduct)



export = router