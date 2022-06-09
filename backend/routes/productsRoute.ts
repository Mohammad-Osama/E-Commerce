import express ,{Request,Response} from "express"
// import {getProducts} from "../controllers/productsController" 
import {getProducts , addProduct , updateProduct , deleteProduct   } from "../controllers/productsController"


const router = express.Router()


router.get ("/" , getProducts ) 

router.post ("/" , addProduct )

router.put ("/:id" ,updateProduct)

router.delete ("/:id" , deleteProduct)


module.exports = router