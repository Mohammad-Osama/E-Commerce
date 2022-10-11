import jwt, { Secret } from "jsonwebtoken"
import { ObjectId } from "mongoose"
import mongoose from "mongoose";
import { Types } from "mongoose";

export const generateToken = (id : Types.ObjectId) => {
    return jwt.sign({id},process.env.JWT_SECRET as Secret ,
      { expiresIn:"30d"})
  }