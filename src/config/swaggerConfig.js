import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MongoDB Final - Proyecto UTN",
      version: "1.0.0",
      description: "API para la gestión de productos, categorías y usuarios",
      contact: {
        name: "Soporte Técnico",
        email: "[EMAIL_ADDRESS]"
      }
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de desarrollo local"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ["./src/routes/*.js"]
};

export const swaggerSpec = swaggerJSDoc(options);
