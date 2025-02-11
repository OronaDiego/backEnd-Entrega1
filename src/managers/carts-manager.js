import fs from "fs";
import { v4 as uuidv4 } from "uuid";

class CartManager {
    constructor(path) {
        this.path = path;
    }

    // Obtener todos los carritos
    async getCarts() {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    // Obtener un carrito por ID
    async getCartById(cartId) {
        const carts = await this.getCarts();
        return carts.find(cart => cart.id === cartId);
    }

    // Crear un nuevo carrito
    async createCart() {
        const carts = await this.getCarts();
        const newCart = { id: uuidv4(), products: [] };
        carts.push(newCart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    // Agregar producto al carrito
    async addProductToCart(cartId, productId) {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex(cart => cart.id === cartId);
        if (cartIndex === -1) throw new Error("Carrito no encontrado");

        const cart = carts[cartIndex];
        const productIndex = cart.products.findIndex(p => p.product === productId);

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1; // Incrementar cantidad si ya existe
        } else {
            cart.products.push({ product: productId, quantity: 1 }); // Agregar nuevo producto
        }

        carts[cartIndex] = cart;
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        return cart;
    }
}

export const manager = new CartManager("./carts.json");