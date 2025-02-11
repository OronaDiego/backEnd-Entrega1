import { Router } from "express";
import { manager} from '../managers/carts-manager.js'

const router = Router();


// Obtener productos de un carrito por ID
router.get("/:id", async (req, res) => {
    try {
        const cart = await manager.getCartById(req.params.id);
        if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
        res.json(cart.products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Agregar un producto a un carrito
router.post("/:cartId/product/:productId", async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const updatedCart = await manager.addProductToCart(cartId, productId);
        res.json({ msg: "Producto agregado", cart: updatedCart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
