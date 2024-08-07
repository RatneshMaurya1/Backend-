
const asyncHandler = (reqestHandler) => {
  (req,res,next) => {
    Promise.resolve(reqestHandler(req,req,next)).catch((error) => next(error))
  }
}

export default asyncHandler
