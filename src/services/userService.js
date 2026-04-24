import User, { roleEnum } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middlewares/verifyTokenMiddleware.js";

// Register
export const registerUserService = async (data) => {
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    const error = new Error("El usuario ya existe");
    error.statusCode = 400;
    throw error;
  }

  const user = new User(data);
  return await user.save();
};

// Login
export const loginUserService = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("Usuario no encontrado");
    error.statusCode = 404;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error("Credenciales incorrectas");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken({
    userId: user._id,
    email: user.email,
    role: user.role
  });

  return {
    user,
    token
  };
};

// Obtener todos
export const getAllUsersService = async () => {
  return await User.find().select("-password");
};

// Actualizar
export const updateUserService = async (id, data, currentUser) => {
  if (currentUser.userId !== id) {
    const error = new Error("No tienes permisos para editar este perfil");
    error.statusCode = 403;
    throw error;
  }

  const updatedUser = await User.findByIdAndUpdate(id, data, {
    new: true
  }).select("-password");

  if (!updatedUser) {
    const error = new Error("Usuario no encontrado");
    error.statusCode = 404;
    throw error;
  }

  return updatedUser;
};

// Eliminar
export const deleteUserService = async (id, currentUser) => {
  if (currentUser.userId !== id && currentUser.role !== roleEnum[1]) {
    const error = new Error("No tienes permisos para eliminar este usuario");
    error.statusCode = 403;
    throw error;
  }

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    const error = new Error("Usuario no encontrado");
    error.statusCode = 404;
    throw error;
  }

  return deletedUser;
};
