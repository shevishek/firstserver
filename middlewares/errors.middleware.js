export const erorrs=(err,req,res,next)=>{
   const state=err.status ?? 500
   const {message='server error!'}=err

   res.status(state).json(
    {
        error:
        {
            error:message,
            type:'server error'
        }
    }
   )
}