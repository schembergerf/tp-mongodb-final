import {
  registerUserService,
  loginUserService,
  getAllUsersService,
  updateUserService,
  deleteUserService
} from "../services/userService.js";

// Registrar
export const registerUser = async (req, res, next) => {
  try {
    const user = await registerUserService(req.body);
    user.password = undefined;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// Login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUserService(email, password);

    res.status(200).json({
      user,
      token
    });
  } catch (error) {
    next(error);
  }
};

// Obtener todos
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Actualizar
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await updateUserService(
      req.params.id,
      req.body,
      req.user
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// Eliminar
export const deleteUser = async (req, res, next) => {
  try {
    await deleteUserService(req.params.id, req.user);
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};
