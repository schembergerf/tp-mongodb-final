import express from "express";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";
import { verifyRoleMiddleware } from "../middlewares/verifyRoleMiddleware.js";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../controllers/categoryController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorías
 */
router.get("/", getAllCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Obtener categoría por ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos de la categoría
 */
router.get("/:id", getCategoryById);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Crear categoría (Solo ADMIN)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Categoría creada
 */
router.post("/",
  verifyTokenMiddleware,
  verifyRoleMiddleware(["ADMIN"]),
  createCategory
);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Actualizar categoría (Solo ADMIN)
 *     tags: [Categories]
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
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Categoría actualizada
 */
router.put("/:id",
  verifyTokenMiddleware,
  verifyRoleMiddleware(["ADMIN"]),
  updateCategory
);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Eliminar categoría (Solo ADMIN)
 *     tags: [Categories]
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
 *         description: Categoría eliminada
 */
router.delete("/:id",
  verifyTokenMiddleware,
  verifyRoleMiddleware(["ADMIN"]),
  deleteCategory
);

export default router;
