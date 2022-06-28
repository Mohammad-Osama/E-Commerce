import { Request, Response } from "express"
import mongoose from "mongoose"
import { Product, IProduct } from "../models/productModel"


// all products with pages and limit
export async function getProducts(req: Request, res: Response) {
   try {
      const page: number = parseInt(req.query.page as string) || 1
      const limit: number = 12
      const skip = (page - 1) * limit


      const products = await Product.find().skip(skip).limit(limit)

      res.status(200).json(products)

   } catch (error) {
      res.status(400).json(`Error==>${error}`);
   }

}

// search products by name , query still to be written
export async function searchProducts(req: Request, res: Response) {
   
   const queryName = req.query.name as any
   try {
      const products = await Product.find({
         "name": { "$regex": `${queryName}`, '$options': 'i' },
      }).limit(10)

      res.status(200).json(products)

   } catch (error) {
      res.status(400).json(`Error==>${error}`);
   }


}

//get products by category id 
export async function getProductsByCategory(req: Request, res: Response) {
   try {
      const queryID = req.query.category as string
      const ObjectId = mongoose.Types.ObjectId
      const finalID = new ObjectId(queryID);
      const products = await Product.find({ category: finalID }).limit(3)

      res.status(200).json(products)
   } catch (error) {
      res.status(400).json(`Error==>${error}`);
   }

}

//get products by brand id 
export async function getProductsByBrand(req: Request, res: Response) {
   try {
      const queryID = req.query.brand as string
      const ObjectId = mongoose.Types.ObjectId
      const finalID = new ObjectId(queryID);
      const products = await Product.find({ brand: finalID }).limit(3)

      res.status(200).json(products)
   } catch (error) {
      res.status(400).json(`Error==>${error}`);
   }

}


//get product by id 
export async function getProductById(req: Request, res: Response) {
   try {
      const id= req.params.id as string
      const product = await Product.findById(id)

      res.status(200).json(product)
   } catch (error) {
      res.status(400).json(`Error==>${error}`);
   }

}
// new product 
export async function addProduct(req: Request, res: Response) {
   try {
      const newProduct: IProduct = await Product.create({
         name: req.body.name,
         model: req.body.model,
         main_image: req.body.main_image,
         images: req.body.images,
         description: req.body.description,
         price: req.body.price,
         currency: req.body.currency,
         stock: req.body.stock,
         category: req.body.category,
         brand: req.body.brand,
         sale: req.body.sale,
         featured: req.body.featured
      })

      res.status(201).json(newProduct)
   } catch (error) {
      res.status(400).json(`Error==>${error}`);
   }

}

// update  product 
export async function updateProduct(req: Request, res: Response) {
   const id: string = req.params.id
   const existingProduct: IProduct | null = await Product.findById(id)

   if (!existingProduct) {
      res.status(400)
      throw new Error("Product not found")
   }
   else {
      try {
         const updatedProduct: IProduct | null = await Product.findByIdAndUpdate(
            id, req.body, { returnDocument: "after" }
         )

         res.status(200).json(updatedProduct)
      } catch (error) {

         res.status(400).json(`Error==>${error}`);
      }

   }

}

// delete product 
export function deleteProduct(req: Request, res: Response): void {

   res.status(200).json({ message: `delete product with id ${req.params.id as unknown as number}` })
}


