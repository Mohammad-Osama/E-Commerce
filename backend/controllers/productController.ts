import {Request,Response} from "express"
import { Product , IProduct } from "../models/productModel"


// all products with pages and limit
export async function getProducts(req :Request , res : Response)  {
 //  const page : number = parseInt(req.query.page as string ) || 1
  // const limit : number = 3
 //  const products  = await Product.find().skip(page-1*limit).limit(limit)

 const products  = await Product.find({
                                    "name": {"$regex": "sam" ,'$options' : 'i' },
                                    /* "model":{
                                       "$regex": "11"

                                    } */
                                 })   

    res.status(200).json(products)
 }

 // new product 
export async function addProduct(req :Request , res : Response)  {
   
    const newProduct : IProduct = await Product.create({
      name: req.body.name ,
      model: req.body.model,
      main_image: req.body.main_image,
      images: req.body.images,   
      description: req.body.description,
      price: req.body.price,
      currency: req.body.currency,
      stock: req.body.stock,
      category: req.body.category,
      brand: req.body.brand,
      sale :req.body.sale,
      featured :req.body.featured
    })

   res.status(201).json(newProduct)
}

// update  product 
export async function updateProduct(req :Request , res : Response) {
   const id : string = req.params.id
   const existingProduct:IProduct | null = await Product.findById(id)
   
   if (!existingProduct){
      res.status(400)
      throw new Error ("Product not found")
     }         
   else {
      try {
         const updatedProduct :IProduct | null = await Product.findByIdAndUpdate(
            id ,req.body, {returnDocument:"after"}
            )
      
          res.status(200).json(updatedProduct)
      } catch (error) {
         
         res.status(400).json(`Error==>${error}`);
      }
      
   }
   
}
 
// delete product 
export function deleteProduct(req :Request , res : Response) :void {

   res.status(200).json({message:`delete product with id ${req.params.id as unknown as number}`})
}


