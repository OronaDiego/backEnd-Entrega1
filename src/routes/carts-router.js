import { Router } from "express";
const router = Router()

router.get('/',(req,res)=>{
    res.json('Ruta Del cart')
})

export default router;