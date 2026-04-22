import {
  createCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService
} from "../services/categoryService.js";

// crear
export const createCategory = async (req, res, next) => {
  try {
    const category = await createCategoryService(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

// Optener todo
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await getAllCategoriesService();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

// Optener por ID
export const getCategoryById = async (req, res, next) => {
  try {
    const category = await getCategoryByIdService(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// Actualizar
export const updateCategory = async (req, res, next) => {
  try {
    const category = await updateCategoryService(req.params.id, req.body);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// Eliminar
export const deleteCategory = async (req, res, next) => {
  try {
    await deleteCategoryService(req.params.id);
    res.status(200).json({ message: "Categoría eliminada" });
  } catch (error) {
    next(error);
  }
};
