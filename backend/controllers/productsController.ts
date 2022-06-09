import express ,{Request,Response} from "express"



// all products  
export function getProducts(req :Request , res : Response) :void {

    res.status(200).json({response:"get all"})
 }

 // new product 
export function addProduct(req :Request , res : Response) :void {

   res.status(200).json({message:"new product"})
}

// update  product 
export function updateProduct(req :Request , res : Response) :void {

   res.status(200).json({message:`update product with id ${req.params.id as unknown as number}`})
}

// delete product 
export function deleteProduct(req :Request , res : Response) :void {

   res.status(200).json({message:`delete product with id ${req.params.id as unknown as number}`})
}






  // export default  {getProducts , addProduct}

 /*  module.exports ={
   getProducts

  } */
 