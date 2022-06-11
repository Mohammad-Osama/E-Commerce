import mongoose from "mongoose";


export interface IBrand {
    name: string;
    description: string;
    logo:string
}

const BrandSchema = new mongoose.Schema<IBrand>({
    name: { type: String, required: [false, "Please add a name"] },
    description: { type: String, required: [false, "Please add a description"] },
    logo:{ type: String, required: [false, "Please add a logo"] },
},
{
    timestamps : true
})

export const Brand = mongoose.model<IBrand>('Brand', BrandSchema);