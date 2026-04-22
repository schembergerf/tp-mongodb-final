import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { isGoodPassword } from "../utils/validators.js";

export const roleEnum = ["USER", "ADMIN"];

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxLength: [
        30,
        "Por favor el apellido debe tener menos de 40 caracteres"
      ],
      minLength: [2, "Por favor el apellido debe tener mas de 4 caracteres"]
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxLength: [
        30,
        "Por favor el apellido debe tener menos de 40 caracteres"
      ],
      minLength: [2, "Por favor el apellido debe tener mas de 4 caracteres"]
    },
    email: {
      type: String,
      required: true,
      maxLength: [40, "Por favor el email debe tener menos de 40 caracteres"],
      minLength: [4, "Por favor el email debe tener mas de 4 caracteres"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Por favor, ingresa un correo electrónico válido"
      ]
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return isGoodPassword(value);
          return true;
        },
        message:
          "La contraseña debe tener entre 6 y 12 caracteres, incluir al menos una mayúscula, una minúscula y un número."
      }
    },
    role: {
      type: String,
      validate: {
        validator: function (value) {
          return roleEnum.includes(value);
        },
        message: (props) => `${props.value} it is not a valid role`
      },
      default: roleEnum[0]
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = bcrypt.hashSync(this.password, 10);
});

export default mongoose.model("User", userSchema);
