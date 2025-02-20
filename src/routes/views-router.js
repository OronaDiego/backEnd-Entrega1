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

// const products = []; 
// router.post('/addProduct', (req, res) => {
//     const { title,desc,code, price, stock } = req.body;

//     // Validamos que los datos existan
//     if (!title || !desc || !code || !price || !stock) {
//         return res.status(400).json({ error: 'Todos los campos son obligatorios' });
//     }

//     // Creamos un nuevo producto
//     const newProducto = {
//         id: products.length + 1, // Generar ID simple
//         title,
//         desc,
//         code,
//         price,
//         stock,
//     };

//     // Guardamos el producto en la lista
//     products.push(newProducto);

//     // Emitimos el nuevo producto a todos los clientes conectados
//     socketServer.emit('newProducto', newProducto);

//     res.json({ message: 'Producto agregado correctamente', product: newProducto });
// });
export default router