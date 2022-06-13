import React, { ReactElement } from "react";
import { IProduct } from "../helpers/types";

 type  P = {
    _id :string ;
    name: string;
    model: string;
    main_image: string;
    images: string;    
    description: string;
    price: number;
    currency: string;
    stock: number;
    sale:number;
    featured : boolean ;
    category?: string ; 
    brand?: string ;    
    vote_count : number;
    vote_total : number;   
   
};

interface X {
    product :IProduct;
   
  }


const Product = ({ product } : X) => {
  const  { _id, name, main_image, price, currency, stock, vote_count, vote_total, description, model } = product
    return (
        <div>
          name  {name} 
        </div>
    )
}

export default  Product
