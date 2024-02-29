import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
export const verifyJwt=asyncHandler(async(req,_,next)=>{//use _ for res if not in use
  // Safely extracts the JWT token from the request by checking if the "accessToken" cookie exists,
  // and if not, retrieves the token from the "Authorization" header while handling potential undefined values.
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "")
      if(!token){
        throw new ApiError(401,"Unauthorized request");
      }
     const decodedToken= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
     const user=await User.findById(decodedToken?._id).
     select("-password -refreshToken")
     if(!user){
      throw new ApiError(401,'Invalid Access Token')
     }
     req.user =user;
     next()
  } catch (error) {
    throw new ApiError(401,error?.message || "Invalid access token" )
  }
})