import mongoose from "mongoose";


export interface ICategory {
    name: string;
    description: string;
    logo:string
}

export const CategorySchema = new mongoose.Schema<ICategory>({
    name: { type: String, required: [true, "Please add a name"] },
    description: { type: String, required: [true, "Please add a description"] },
    logo:{ type: String, required: [true, "Please add a logo"] },
},
{
    timestamps : true
})

    CategorySchema.set('toJSON', {
        transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        }
    })

export const Category = mongoose.model<ICategory>('Category', CategorySchema);