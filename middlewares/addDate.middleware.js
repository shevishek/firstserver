export const addDate=(req,res,next)=>{

    req.currentDate=new Date()
    next()
}

export const printDate=(res,req,next)=>{
    if(res.method=="get")
      console.log(res.currentDate)
     next()
}