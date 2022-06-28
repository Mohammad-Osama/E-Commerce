import mongoose from "mongoose";

export interface IReview {
    title: string;
    text: string;
    rating: number;
    user: mongoose.Types.ObjectId;
    product: mongoose.Types.ObjectId;
};


const ReviewSchema = new mongoose.Schema<IReview>({
    title: { type: String, required: [true, "Please add a title"] },
    text: { type: String, required: [true, "Please add text"] },
    rating: { type: Number, required: [true, "Please add the main image"],
                 min: 1, max: 5 ,
                 enum:[1,2,3,4,5]  
                 } ,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please add the user"],
        ref: "User"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please add the product"],
        ref: "Product"
    },

},
    {
        timestamps: true
    });

    ReviewSchema.set('toJSON', {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
        }
})

export const Review = mongoose.model<IReview>('Review', ReviewSchema);