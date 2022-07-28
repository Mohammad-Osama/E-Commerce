import express from "express"
import {getProducts ,
        addProduct , 
        updateProduct ,
        deleteProduct,   
        searchProducts,
        getProductsByCategory,
        getProductsByBrand,
        getProductById,
        }
      from "../controllers/productController"
import { authCode } from "../middleware/codeMiddleware"

const router = express.Router()

router.route("/")
                  .get(getProducts)
                  .post(authCode,addProduct)
  
router.route("/product/:id")
                  .get(getProductById)
                  .put(updateProduct)
                  .delete(deleteProduct)

router.route("/search")
                  .get(searchProducts)

router.route("/bycategory")
                  .get(getProductsByCategory)

router.route("/bybrand")
                  .get(getProductsByBrand)

router.route("/bybrand")
                  .get(getProductsByBrand)

                  
export = router