import { Router }  from 'express'
import { manager } from '../managers/products-manager.js';
import { productValidator } from '../middlewares/product-validator.js';
const router =  Router();

//aca dentro creo las rutas para los productos 
router.get('/',async(req,res)=>{
    try {
        const products = await manager.getAllProducts();
        res.json(products)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error.menssage})
    }
})
router.get('/:id',async(req,res)=>{
    try {
        const { id } = req.params;        
        const products = await manager.getProductsById(id);
        res.json(products)
    } catch (error) {
        res.status(404).json({msg:error.menssage});
    }
})
router.post('/create',[productValidator], async(req,res)=>{
    try {
        const product = await manager.createProducts(req.body);
        return res.status(201).json({id: product.id , title: product.title})
    } catch (error) {
        return res.status(404).json({msg:error.message});
    }
})
router.put('/:id',[productValidator],async(req,res)=>{
    try {
        const {id} = req.params;
        const productUpd = await manager.updateProduct(req.body, id)
        res.status(200).json(productUpd)
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const productDel = await manager.deleteProducts(id);
        res.status(200).json({msg: `Product delete succes - id: ${productDel.id}`})
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
})


export default router;