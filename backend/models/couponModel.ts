import mongoose from "mongoose";


export interface ICoupon {
    name: string;
    value: number;
}

const CouponSchema = new mongoose.Schema<ICoupon>({
    name: { type: String, required: [true, "Please add a name"], unique: true },
    value: {
        type: Number, required: [true, "Please add a value"],
        min: 5,
        max: 30,
        default: 0,
        enum: [5, 10, 15, 20, 25, 30],

    },
},
    {
        timestamps: true
    })

    CouponSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
    }
})

export const Coupon = mongoose.model<ICoupon>('Coupon', CouponSchema);