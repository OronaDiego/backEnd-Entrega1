import { Router } from "express";
import { manager } from "../managers/products-manager.js";
const router = Router();

router.get('/', (req,res)=>{
    res.render('vista1')
})
router.get('/home', async(req,res)=>{
    const products = await manager.getAllProducts()
    console.log(products)
    res.render('home', {products} )
})

export default router