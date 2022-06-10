import mongoose from "mongoose";


export interface IBrand {
    name: string;
    description?: string;
    logo:string
}

export const Brand = new mongoose.Schema<IBrand>({
    name: { type: String, required: [true, "Please add a name"] },
    description: { type: String, required: [true, "Please add a description"] },
    logo:{ type: String, required: [true, "Please add a logo"] },
},
{
    timestamps : true
})