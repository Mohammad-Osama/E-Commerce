import express from "express"
import {getProducts ,
        addProduct , 
        updateProduct ,
        deleteProduct,   
        searchProducts,
        getProductsCategory}
      from "../controllers/productController"


const router = express.Router()

router.route("/")
                  .get(getProducts)
                  .post(addProduct)
  
router.route("/:id")
                  .put(updateProduct)
                  .delete(deleteProduct)

router.route("/search")
                  .get(searchProducts)

router.route("/bycategory")
                  .get(getProductsCategory)

export = router