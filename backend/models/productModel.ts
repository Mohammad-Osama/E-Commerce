import mongoose from "mongoose";

export interface  IProduct  {
    code: string;
    name: string;
    model: string;
    images: mongoose.Types.Array<string>;
    main_image: string;
    description: string;
    price: number;
    currency: string;
    stock: number;
    category: mongoose.Types.ObjectId ; 
    brand: mongoose.Types.ObjectId ;    
    vote_count : number;
    vote_total : number;    
   
};


export const Product = new mongoose.Schema<IProduct>({
    name: { type: String, required: [true, "Please add a name"] },
    model: String ,
    images: [String] ,
    main_image: { type: String, required: [true, "Please add the main image"] },
    description: { type: String, required: [true, "Please add the description"] },
    price: { type: Number, required: [true, "Please add the price"] },
    currency: String ,
    stock: { type: Number, required: [true, "Please add the stock"] },
    category: {
        type : mongoose.Schema.Types.ObjectId ,
        required: [true, "Please add the category"] ,
        ref :"Category"
    },
    brand: {
        type : mongoose.Schema.Types.ObjectId ,
        required: [true, "Please add the brand"] ,
        ref :"Brand"
    },   
    vote_count : Number,
    vote_total : Number,
   
  } ,
  {
      timestamps : true
  });