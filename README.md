#  Proyecto Backend -- Entrega final

Este proyecto es un backend donde manejo usuarios con distintos roles,
carritos de compra y un flujo completo para comprar productos.


### 1. Models (Mongoose)

Acá están los modelos de MongoDB: - User: info del usuario, email,
contraseña, rol y su carrito. - Cart: lista de productos con
cantidades. - Product: los productos que se pueden comprar.

Cada uno solo define la estructura de los datos.

### 2. DAO (Data Access Object)

Acá están los archivos que se comunican directamente con la base de datos. Son
los que hacen las queries reales: find, create, update, delete, etc.

La idea es que esta capa solo se encargue de hablar con Mongo.

### 3. Repositories

En los repositorios llamo a los DAO y normalizo la info, acomodo
lo que venga de Mongo para dejarlo más limpio para el resto del
proyecto.

### 4. Managers

Los managers son los que tienen la lógica del negocio. Acá pongo lo que
realmente hace cada caso:

-   Crear usuario
-   Login
-   Crear carrito
-   Agregar productos
-   Finalizar compra

El manager junta datos del repositorio, los procesa y devuelve el
resultado listo para usar.

### 5. Controllers

Los controllers reciben las rutas y llaman a los managers.

Acá no hay lógica del negocio, solo manejo la request y la response.

### 6. Routes

Las rutas solo reciben la petición del cliente y llaman al controller
correspondiente.

### 7. DTO

El DTO recibe el usuario completo que viene de la base de datos y 
crea uno nuevo, pero solo con los datos que realmente necesito mostrar.
Con esto evito mandar el password u otros datos internos que no hacen falta.


## 👤 Roles de usuarios

El sistema tiene roles porque no todos pueden hacer lo mismo:

-   USER: puede ver productos, crear carrito, agregar productos y comprar.
-   ADMIN: manejan el flujo de productos, pueden crear y eliminar.

##   Flujo del proceso de compra

Este es el camino completo desde que el usuario entra al sistema hasta
que compra:

1.  El usuario se registra o inicia sesión.
2.  Entra a su carrito (o se crea uno automáticamente).
3.  Agrega productos al carrito.
4.  Cuando confirma la compra, el sistema revisa:
    -   Si hay stock suficiente
    -   Si puede restarlos
    -   Si hay productos sin stock
5.  Se genera un ticket de compra.
6.  El carrito se limpia o deja solo los productos sin stock.

##   Endpoints principales

### /api/users

-   POST /register
-   POST /login
-   GET /current

### /api/carts

-   POST / (crear carrito)
-   GET /:cid (buscar carrito)
-   POST /:cid/product/:pid (agregar productos al carrito)
-   POST /:cid/purchase (terminar la compra)

### /api/products

-   GET / muestra todos los productos o getbyid muestra un producto por id
-   POST / (solo admin)

##  Resumen final

El proyecto está dividido en capas, los roles manejan permisos y el
proceso de compra controla stock, genera ticket y limpia el carrito.

##  (IMPORTANTE) Nota sobre las variables de entorno

Para este proyecto práctico dejé el archivo .env dentro del repositorio.
