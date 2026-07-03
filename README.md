# FSD-Backend

¡Bienvenido al backend de mi plataforma de E-Commerce! 


## Tecnologías y Base de Datos

Este proyecto utiliza una arquitectura de base de datos híbrida para optimizar el rendimiento de cada módulo:
**PostgreSQL (Supabase):** Gestión de usuarios, productos, carrito y pedidos
**MongoDB (Atlas):** Gestión de reviews y wishlist
**Autenticación:** JSON Web Tokens (JWT)
**Testing:** Supertest.


## Estructura del Proyecto

El código sigue un patrón limpio y desacoplado (Controlador - Servicio - Ruta):

src
├── config
│   ├── mongo.js
|   ├──prismaClient.js
|   └── swagger.js
├── controllers
│   ├── auth.controller.js
│   ├── cart.controller.js
│   ├── product.controller.js
│   ├── review.controller.js
│   └── wishlist.controller.js
├── middlewares
│   ├── authenticate.js
│   ├── errorHandler.js
│   ├── notFound.js
|   ├── requireRole.js
│   └── validateProduct.js
├── models
│   ├── adminlog.model.js
│   ├── review.model.js
│   └──  wishlits.model.js
├── routes
│   ├── auth.routes.js
│   ├── cart.routes.js
|   ├── index.routes.js
│   ├── product.routes.js
│   ├── review.routes.js
|   ├── users.routes.js
│   └── wishlist.routes.js
├── services
|   ├── andimlog.service.js
│   ├── auth.service.js
│   ├── cart.service.js
│   ├── product.service.js
│   ├── review.service.js
│   └── wishlist.service.js
├── test
|   ├── cart.utils.test.js
│   ├── reviewService.test.js
|   └── wishlistService.test.js
├── utils
|   └── cart.utils.js
├── app.js
└── server.js