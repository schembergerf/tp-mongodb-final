# 🛒 API RESTful - Gestión de Productos, Categorías y Usuarios

## 📌 Descripción
Este proyecto es una API RESTful diseñada para la gestión de una **tienda personal**. Desarrollada con **Node.js**, **Express** y **MongoDB**, permite administrar un catálogo de productos y categorías, con un sistema de autenticación basado en roles donde el administrador actúa como el **dueño de la tienda** y los usuarios como los **compradores**.

Se ha seguido una arquitectura de capas (Controllers, Services, Models) para asegurar la escalabilidad y mantenibilidad del código.

---

## 🛠️ Tecnologías utilizadas
- **Backend:** Node.js, Express.js
- **Base de Datos:** MongoDB & Mongoose
- **Seguridad:** JWT (JSON Web Tokens), bcrypt (Encriptación)
- **Documentación:** Swagger (OpenAPI)
- **Herramientas:** dotenv, cors, nodemon

---

## 📁 Estructura del Proyecto

```text
tp-mongoDB-final/
├── src/
│   ├── config/         # Configuración (DB, Swagger, Env)
│   ├── controllers/    # Controladores (Manejo de peticiones)
│   ├── middlewares/    # Middlewares (Auth, Roles)
│   ├── models/         # Modelos de Mongoose
│   ├── routes/         # Definición de rutas
│   ├── services/       # Lógica de negocio
│   └── utils/          # Utilidades y validaciones
├── .env                # Variables de entorno (no incluido en git)
├── index.js            # Punto de entrada de la aplicación
└── package.json        # Dependencias y scripts
```

---

## 🗄️ Esquema de la Base de Datos

### 1. Usuarios (`users`)
- `firstName`: String (Requerido)
- `lastName`: String (Requerido)
- `email`: String (Requerido, Único)
- `password`: String (Requerido, Encriptado)
- `role`: String (Enum: `USER`, `ADMIN`. Default: `USER`)

### 2. Productos (`products`)
- `name`: String (Requerido, Único)
- `description`: String
- `price`: Number (Requerido)
- `stock`: Number (Requerido)
- `category`: ObjectId (Referencia a `Category`, Requerido)

### 3. Categorías (`categories`)
- `name`: String (Requerido, Único)
- `description`: String

---

## ⚙️ Instalación y Ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/schembergerf/tp-mongodb-final.git
   ```
2. **Instalar dependencias:**
   ```bash
   npm install
   ```
3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz con:
   ```env
   PORT=
   MONGO_URI=
   JWT_SECRET=
   ```
4. **Ejecutar el proyecto:**
   ```bash
   npm run dev
   ```
5. **Ver documentación interactiva:**
   Visita `http://localhost:3000/api-docs` para probar los endpoints.

---

## 🔐 Autenticación y Usuarios

### 🛡️ Roles y Permisos
- **USER (Comprador):** Puede visualizar productos y categorías, y gestionar su propio perfil de usuario.
- **ADMIN (Dueño):** Posee control total sobre el inventario (productos y categorías), además de poder gestionar y eliminar cuentas de usuarios.

### Endpoints de Usuario
| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| POST | `/api/users/register` | Registrar un nuevo usuario | Público |
| POST | `/api/users/login` | Iniciar sesión (Retorna Token) | Público |
| GET | `/api/users` | Listar todos los usuarios | Solo ADMIN |
| PUT | `/api/users/:id` | Editar perfil propio | Usuario |
| DELETE | `/api/users/:id` | Eliminar cuenta | Usuario / ADMIN |

---

## 📦 Gestión de Productos y Categorías

### Endpoints de Productos
| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| GET | `/api/products` | Listar productos (con populate) | Público |
| GET | `/api/products/:id` | Obtener un producto por ID | Público |
| POST | `/api/products` | Crear un producto | Solo ADMIN |
| PUT | `/api/products/:id` | Actualizar un producto | Solo ADMIN |
| DELETE | `/api/products/:id` | Eliminar un producto | Solo ADMIN |

### Endpoints de Categorías
| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| GET | `/api/categories` | Listar todas las categorías | Público |
| GET | `/api/categories/:id` | Obtener una categoría por ID | Público |
| POST | `/api/categories` | Crear una categoría | Solo ADMIN |
| PUT | `/api/categories/:id` | Actualizar una categoría | Solo ADMIN |
| DELETE | `/api/categories/:id` | Eliminar una categoría | Solo ADMIN |

---

## 🧪 Ejemplos de Datos Mock (JSON)

### Registro de Usuario (`POST /api/users/register`)
```json
{
  "firstName": "Facu",
  "lastName": "Schem",
  "email": "facusch@example.com",
  "password": "Password123"
}
```

### Crear Categoría (`POST /api/categories`)
```json
{
  "name": "Electrónica",
  "description": "Dispositivos y gadgets tecnológicos"
}
```

### Crear Producto (`POST /api/products`)
```json
{
  "name": "Smartphone",
  "description": "Última generación, 128GB",
  "price": 899999,
  "stock": 50,
  "category": "65f1a..." 
}
```
*(Nota: El ID de categoría debe ser uno existente en la DB)*

---

## 👨‍💻 Autor
**Facundo Schemberger**
