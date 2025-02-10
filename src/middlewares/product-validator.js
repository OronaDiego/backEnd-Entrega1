export const productValidator = (req,res,next)=>{
    if(
        req.body.title === undefined ||
        req.body.description === undefined ||
        req.body.code === undefined || 
        req.body.status === undefined ||
        req.body.stock === undefined ||
        req.body.category === undefined
    )
    return res.status(404).json({error: 'Invalid Body'});
    return next()
}