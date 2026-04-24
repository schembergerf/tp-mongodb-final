import express from "express";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";
import { verifyRoleMiddleware } from "../middlewares/verifyRoleMiddleware.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - stock
 *         - category
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         stock:
 *           type: number
 *         category:
 *           type: string
 *           description: ID de la categoría
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente
 */
router.get("/", getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del producto
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un nuevo producto (Solo ADMIN)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado
 *       403:
 *         description: Permisos insuficientes
 */
router.post("/",
  verifyTokenMiddleware,
  verifyRoleMiddleware(["ADMIN"]),
  createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar un producto (Solo ADMIN)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado
 */
router.put("/:id",
  verifyTokenMiddleware,
  verifyRoleMiddleware(["ADMIN"]),
  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto (Solo ADMIN)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado
 */
router.delete("/:id",
  verifyTokenMiddleware,
  verifyRoleMiddleware(["ADMIN"]),
  deleteProduct
);

export default router;
