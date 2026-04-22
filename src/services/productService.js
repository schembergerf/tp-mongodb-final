import Product from "../models/productModel.js";

// Crear
export const createProductService = async (data) => {
  const product = new Product(data);
  return await product.save();
};

// Obtener todos
export const getAllProductsService = async () => {
  return await Product.find().populate("category");
};

// Obtener por ID
export const getProductByIdService = async (id) => {
  const product = await Product.findById(id).populate("category");
  if (!product) {
    const error = new Error("Producto no encontrado");
    error.statusCode = 404;
    throw error;
  }
  return product;
};

// Actualizar
export const updateProductService = async (id, data) => {
  const product = await Product.findByIdAndUpdate(id, data, {
    new: true
  });

  if (!product) {
    const error = new Error("Producto no encontrado");
    error.statusCode = 404;
    throw error;
  }

  return product;
};

// Eliminar
export const deleteProductService = async (id) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    const error = new Error("Producto no encontrado");
    error.statusCode = 404;
    throw error;
  }

  return product;
};
