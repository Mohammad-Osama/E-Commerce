import mongoose from "mongoose";

export interface IUser {
    id : mongoose.Types.ObjectId
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    birthday: Date;
    phone: string;
    status: string;
    role: string;
    country: string;
    address: string;
    coupon: mongoose.Types.ObjectId;
};


const UserSchema = new mongoose.Schema<IUser>({
    
    first_name: { type: String,
                  required: [true, "Please add a first name"] },
    last_name: { type: String, 
                 required: [true, "Please add a last name"] },
    email: { type: String, 
             required: [true, "Please add an email"], 
             unique: true },
    password: { type: String,
                required: [true, "Please add a password"] },
    birthday: { type: Date },
    phone: { type: String },
    status: { type: String,
              enum:["active","deactivated","suspended"],
              default: "active" },
    role: { type: String,
            enum:["user","admin"],
            default: "user" },
    country: { type: String },
    address: { type: String },
    coupon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coupon"
    },
    
},
    {
        timestamps: true
    });


UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
    }
})

export const User = mongoose.model<IUser>('User', UserSchema);