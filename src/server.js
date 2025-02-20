import express from "express";
import path from "path";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";
import productsRouter from "./routes/products-router.js";
import cartsRouter from "./routes/carts-router.js";
import viewsRouter from "./routes/views-router.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "src", "public")));

//  __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar Handlebars
app.engine(
    "handlebars",
    engine({
        layoutsDir: path.join(__dirname, "views", "layout"), // me aseguro que busque el layout
        defaultLayout: "main", // Me aseguro que existe views/layouts/main.handlebars
        extname: ".handlebars",
    })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use("/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(8080, () => {
    console.log("Server corriendo en el puerto 8080");
});

const products = [
    { title: "Reloj", desc: "reloj sumergible", code:123, price:100000, stock:4 }
];

//creo la conexion del lado del servidor
    export const socketServer = new Server(httpServer);
//escucho la conexion
socketServer.on("connection", (socket) => {
    console.log(`Usuario conectado id:${socket.id}`);
    socket.on("disconnect", () => {
        console.log(`user desconectado ${socket.id}`);
    });

    socketServer.emit("arrayProducts", products);
    socket.on("newProduct", (prod)=>{
        products.push(prod)
        socketServer.emit("arrayProducts", products);
    })
});

