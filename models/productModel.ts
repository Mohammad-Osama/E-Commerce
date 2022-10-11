import mongoose from "mongoose";

export interface  IProduct  {
    name: string;
    model: string;
    main_image: string;
    images: mongoose.Types.Array<string>;    
    description: string;
    price: number;
    currency: string;
    stock: number;
    sale:number;
    featured : boolean ;
    category?: mongoose.Types.ObjectId ; 
    brand?: mongoose.Types.ObjectId ;    
    rating_count : number;
    rating_total : number;    
};


 const ProductSchema = new mongoose.Schema<IProduct>({
    name: { type: String, required: [true, "Please add a name"] ,unique:true },
    model: { type: String, required: [true, "Please add a model"] },
    main_image: { type: String, required: [true, "Please add the main image"] },
    images: [String] ,    
    description: { type: String, required: [true, "Please add the description"] },
    price: { type: Number, required: [true, "Please add the price"] },
    currency: {
        type: String, 
        default: "USD"
    } ,
    stock: { type: Number, required: [true, "Please add the stock"] },
    sale : { type : Number , min: 0, max: 70, default: 0 } ,
    featured : {type : Boolean , default : false } , 
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
    rating_count : {
        type: Number, 
        default: 0
    } ,
    rating_total : {
        type: Number, 
        default: 0
    },
   
  } ,
  {
      timestamps : true
  });
  ProductSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
    }
  })

  export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);