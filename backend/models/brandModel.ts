import mongoose from "mongoose";


export interface IBrand {
    name: string;
    description: string;
    logo:string
}

const BrandSchema = new mongoose.Schema<IBrand>({
    name: { type: String, required: [true, "Please add a name"] },
    description: { type: String, required: [true, "Please add a description"] },
    logo:{ type: String, required: [true, "Please add a logo"] },
},
{
    timestamps : true
})

    BrandSchema.set('toJSON', {
        transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        }
    })

export const Brand = mongoose.model<IBrand>('Brand', BrandSchema);