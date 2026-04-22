/**
 * Valida que la contraseña sea segura:
 * - Entre 6 y 12 caracteres.
 * - Al menos una letra minúscula.
 * - Al menos una letra mayúscula.
 * - Al menos un número.
 */
export const isGoodPassword = (value) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
  return regex.test(value);
};
