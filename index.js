import express from "express";
import cors from "cors";
import productRoutes from "./src/routes/productRoute.js";
import categoryRoutes from "./src/routes/categoryRoute.js";
import userRoutes from "./src/routes/userRoute.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./src/config/swaggerConfig.js";
import { PORT } from "./src/config/config.js";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// Middleware de manejo de errores global
app.use((error, req, res, next) => {
  console.error(error.stack);
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    error: error.message || "Error interno del servidor"
  });
});

// DB + servidor
import { connectDB } from "./src/config/db.js";

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
  });
});
