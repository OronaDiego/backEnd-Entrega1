import express from 'express';
import productsRouter from './routes/products-router.js'
import cartsRouter from './routes/carts-router.js'
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/products', productsRouter)
app.use('/carts', cartsRouter)





app.listen(8080, ()=>{ console.log('Server corriendo en el puerto 8080')})