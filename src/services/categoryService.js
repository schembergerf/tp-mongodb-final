import Category from "../models/categoryModel.js";

// Crear
export const createCategoryService = async (data) => {
  const category = new Category(data);
  return await category.save();
};

// Obtener todos
export const getAllCategoriesService = async () => {
  return await Category.find();
};


// Optener por ID
export const getCategoryByIdService = async (id) => {
  const category = await Category.findById(id);
  if (!category) {
    const error = new Error("Categoría no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return category;
};

// Actualizar
export const updateCategoryService = async (id, data) => {
  const category = await Category.findByIdAndUpdate(id, data, {
    new: true
  });

  if (!category) {
    const error = new Error("Categoría no encontrada");
    error.statusCode = 404;
    throw error;
  }

  return category;
};

// Eliminar
export const deleteCategoryService = async (id) => {
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    const error = new Error("Categoría no encontrada");
    error.statusCode = 404;
    throw error;
  }

  return category;
};
