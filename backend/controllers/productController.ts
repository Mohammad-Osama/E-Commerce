import {Request,Response} from "express"
import { Product , IProduct } from "../models/productModel"


// const productModel =  IProduct

// all products  
export async function getProducts(req :Request , res : Response)  {
   const products  = await Product.find()

    res.status(200).json(products)
 }

 // new product 
export async function addProduct(req :Request , res : Response)  {
    const newProduct : IProduct = await Product.create({
      name: req.body.name ,
      model: req.body.model,
      main_image: req.body.main_image,
      images: req.body.images,   
      description: req.body.descripstion,
      price: req.body.price,
      currency: req.body.currency,
      stock: req.body.stock,
      category: req.body.category,
      brand: req.body.brand
       
    })


   res.status(200).json(newProduct)
}

// update  product 
export function updateProduct(req :Request , res : Response) :void {

   res.status(200).json({message:`update product with id ${req.params.id as unknown as number}`})
}

// delete product 
export function deleteProduct(req :Request , res : Response) :void {

   res.status(200).json({message:`delete product with id ${req.params.id as unknown as number}`})
}


