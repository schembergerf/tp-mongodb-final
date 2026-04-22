import mongoose from "mongoose";

export const statusEnum = ["AVAILABLE", "NOT_AVAILABLE", "DSICONTINUED"];

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required"],
      ninLength: 2,
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      required: [true, "Name field is required"],
      min: [0, "Price field has to be a number"]
    },
    stock: {
      type: String,
      validator: {
        validator: function (value) {
          return statusEnum.includes(value);
        },
        message: (props) => `${props.value} it is not a valid state`
      },
      default: statusEnum[0]
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Product", productSchema);
