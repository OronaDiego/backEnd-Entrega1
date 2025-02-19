import express from 'express';
import productsRouter from './routes/products-router.js'
import cartsRouter from './routes/carts-router.js'
import viewsRouter from './routes/views-router.js'
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar Handlebars
app.engine('handlebars', engine({
    layoutsDir: path.join(__dirname, 'views', 'layout'), // me aseguro que busque el layout
    defaultLayout: 'main', // Me aseguro que existe views/layouts/main.handlebars
    extname: '.handlebars'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

//configuracion de handlebars
// app.engine('handlebars', handlebars.engine());
// app.set('views', path.join(`${process.cwd()}/src/views`));
// app.set('view engine', 'handlebars');
// console.log(`${process.cwd()}/src/views`);
//De esta manera no me funciono-> no me encontraba nunca el archivo para reenderizar 

app.use('/products', productsRouter)
app.use("/api/carts", cartsRouter);
app.use('/', viewsRouter);





app.listen(8080, ()=>{ console.log('Server corriendo en el puerto 8080')})