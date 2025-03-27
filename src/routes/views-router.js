import { Router } from "express";
// import { socketServer } from "../server.js";
import { manager } from "../managers/products-manager.js";
const router = Router();

router.get('/', (req,res)=>{
    res.render('vista1')
})
router.get('/home', async(req,res)=>{
    const products = await manager.getAllProducts()
    res.render('home', {products} )
})
router.get('/realTimeProducts', (req,res)=>{
    res.render('realTimeProducts')
})

export default router