import asyncHandler from "../utils/asyncHandler.js";


const registerUser = asyncHandler((req,res) => {
    res.status(200).json({
        firstname:"Ratnesh",
        lastname:"Maurya",
        age:20,
        role:"fullStackDeveloper"
    })
})

export default registerUser