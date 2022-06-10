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
    category: Category | null ;  // to be added later 
    brand: Brand |null;    // to be added later 
    vote_count : number;
    vote_total : number;
    
   
};


export const Product = new mongoose.Schema<IProduct>({
    code: { type: String, required: [true, "Please add a code"] },
    name: { type: String, required: [true, "Please add a name"] },
    model: String ,
    images: [String] ,
    main_image: { type: String, required: [true, "Please add the main image"] },
    description: { type: String, required: [true, "Please add the description"] },
    price: { type: Number, required: [true, "Please add the price"] },
    currency: String ,
    stock: { type: Number, required: [true, "Please add the stock"] },
    category: {
        type : mongoose.Types.ObjectId ,
        required: [true, "Please add the category"] ,
        ref :"Category"
    },
    brand: {
        type : mongoose.Types.ObjectId ,
        required: [true, "Please add the brand"] ,
        ref :"Brand"
    },   
    vote_count : Number,
    vote_total : Number,
   
    
  });