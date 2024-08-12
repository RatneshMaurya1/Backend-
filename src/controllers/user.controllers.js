import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const registerUser = asyncHandler( async (req,res) => {
   const {fullname, email,username, password} = req.body
   console.log("email:",email);
   if([fullname,email,username,password].some((field) => field?.trim() === "")){
    throw new ApiError(400, "All fields are required")
   }

   const existedUser = User.findOne({
    $or:[{username},{email}] // $or checks multiple fields 
   })
   
   if(existedUser){
    throw new ApiError(408, "username or email already exists")
   };
   const avatarLocalPath = req.files?.avatar[0]?.path
   const coverImageLocalPath = req.files?.coverImage[0]?.path

   if(!avatarLocalPath){
      throw new ApiError(400, "Avatar files are required")
   }

   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)
   if(!avatar){
      throw new ApiError(400, "Avatar files are required")
   }
   
   const user = await User.create({
      fullname,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      username:username.toLowerCase(),
      password,
      email
   })

   const userObject = await User.findById(user._id).select(
      "-password -refreshToken"
   )

   if(!userObject){
      throw new ApiError(500, " semething went wrong from  server in user registration")
   }

})

export default registerUser