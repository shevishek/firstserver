export const handlerror=(err,req,res,next)=>{
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

export const notFound=(err,res,req,next)=>{
    res.status(404).json({error:{
            error:'Route not found',
            type: 'client error'
        }
    })
}