import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService
} from "../services/productService.js";

// Crear producto
export const createProduct = async (req, res, next) => {
  try {
    const product = await createProductService(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// Obtener todos
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// Obtener por ID
export const getProductById = async (req, res, next) => {
  try {
    const product = await getProductByIdService(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// Actualizar
export const updateProduct = async (req, res, next) => {
  try {
    const product = await updateProductService(req.params.id, req.body);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// Eliminar
export const deleteProduct = async (req, res, next) => {
  try {
    await deleteProductService(req.params.id);
    res.status(200).json({ message: "Producto eliminado" });
  } catch (error) {
    next(error);
  }
};
