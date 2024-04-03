# Guía de API REST - Recetas API

Esta es una guía para interactuar con la API REST de recetas. La API permite manejar recetas y usuarios, incluyendo operaciones como obtener, crear, actualizar y eliminar recetas, así como manejar información de usuarios.

## Inicio Rápido

Para iniciar la aplicación, sigue estos pasos:

1. Clona el repositorio a tu máquina local.

2. Abre una terminal en la raíz del proyecto.

3. Ejecuta `npm install` para instalar todas las dependencias del proyecto.

4. Copia el fichero`.env.example` y cambia el nombre a `.env`, dentro, configura la URI de MongoDB.

5. Inicia la aplicación con `npm start`.

La aplicación ahora debería estar corriendo y escuchando por peticiones.

## Endpoints Disponibles

A continuación, se describen los endpoints disponibles y cómo interactuar con ellos usando Postman para el testeo.

### Recetas

#### Obtener Todas las Recetas

- **GET** `/api/`

  Obtén una lista de todas las recetas disponibles.

  #### Ejemplo de solicitud:

  GET https://localhost:3000/api/

#### Obtener Receta por ID

- **GET** `/api/:idRecipe`

  Obtén los detalles de una receta específica por su ID.

  #### Ejemplo de solicitud:

  GET https://localhost:3000/api/5f987eaf2f9b3100166d9c84

#### Crear una Nueva Receta

- **POST** `/api/`

  Añade una nueva receta a la base de datos.

  #### Cuerpo de la solicitud:

  ```json
  {
    "nombre": "Nombre de la Receta",
    "ingredientes": "ingrediente1: cantidad, ingrediente2: cantidad",
    "alergenos": ["Alergeno1", "Alergeno2"]
  }
  ```

  POST https://localhost:3000/api/

#### Actualizar una Receta

- **PUT** `/api/:idRecipe`

  Modifica la receta seleccionada de la base de datos basado en la ID.

  #### Cuerpo de la solicitud:

  ```json
  {
    "nombre": "Nuevo Nombre de la Receta",
    "ingredientes": {
      "ingrediente1": "nueva cantidad",
      "ingrediente2": "nueva cantidad"
    }
  }
  ```

  PUT https://localhost:3000/api/5f987eaf2f9b3100166d9c84

#### Eliminar una Receta

- **DELETE** `/api/:idRecipe`

  Elimina la receta seleccionada de la base de datos basado en la ID.

  #### Ejemplo de solicitud:

  DELETE https://localhost:3000/api/5f987eaf2f9b3100166d9c84

### Usuarios

Los endpoints de este elemento tienen un funcionamiento similar al anterior

#### Obtener Todos los Usuarios

- **GET** `/admin/user`

  Obtén una lista de todos los usuarios registrados.

  #### Ejemplo de solicitud:

  GET https://localhost:3000/admin/user/

#### Crear un Nuevo Usuario

- **POST** `/admin/user/register/`

  Registra un nuevo usuario a la base de datos.

  #### Cuerpo de la solicitud:

  ```json
  {
    "nombre": "Nombre del Usuario",
    "password": "Contraseña del usuario"
  }
  ```

  POST https://localhost:3000/admin/user/register/

#### Actualizar un Usuario

- **PUT** `/admin/user/:idUser`

  Modifica el usuario seleccionado de la base de datos basado en la ID.

  #### Cuerpo de la solicitud:

  ```json
  {
    "nombre": "Nuevo Nombre del Usuario",
    "password": "Nueva Contraseña del usuario"
  }
  ```

  PUT https://localhost:3000/admin/user/65fab0bcb2aa3d4f740c260f

#### Eliminar un Usuario

- **DELETE** `/admin/user/:idUser`

  Elimina el usuario seleccionado de la base de datos basado en la ID.

  #### Ejemplo de solicitud:

  DELETE https://localhost:3000/admin/user/65fab0bcb2aa3d4f740c260f

#### Obtener contraseña de un Usuario

- **GET** `/admin/bypassword/65fab0bcb2aa3d4f740c260f`

  Obtén la contraseña del usuario seleccionado de la base de datos basado en la ID.

  #### Ejemplo de solicitud:

  DELETE https://localhost:3000/admin/bypassword/65fab0bcb2aa3d4f740c260f

#### LogIn Usuario

- **POST** `/admin/user/login`

  Logearse como usuario y devolver token.

  #### Cuerpo de la solicitud:

  ```json
  {
    "nombre": "Nombre del Usuario",
    "password": "Contraseña del usuario"
  }
  ```

  POST https://localhost:3000/admin/user/login/

## Manejo de Errores

La API devuelve errores estándar HTTP para indicar problemas con las solicitudes:

- `404 Not Found`: No se pudo encontrar el recurso solicitado.
- `400 Bad Request`: Problema con los datos enviados en la solicitud.
- `500 Internal Server Error`: Error interno del servidor.

Asegúrate de manejar estos errores adecuadamente en tu aplicación cliente.

#### Certificación SSL

La API implementa la Certificación SSL para proporcionar una conexión segura y cifrada entre el cliente y el servidor.

La Certificación SSL funciona mediante el uso de dos claves, una clave pública y una clave privada. La clave pública se utiliza para cifrar los datos que se envían desde el cliente al servidor, y la clave privada se utiliza para descifrar estos datos cuando llegan al servidor. Esto asegura que incluso si los datos son interceptados durante la transmisión, no podrán ser leídos sin la clave privada.

Para implementar SSL en nuestra API, hemos utilizado el módulo `https` de Node.js junto con nuestros archivos de certificado y clave privada. Esto permite que nuestra API acepte conexiones seguras en el puerto especificado.

Es importante tener en cuenta que la implementación de SSL requiere un certificado válido emitido por una Autoridad de Certificación (CA). Este certificado debe ser renovado regularmente para mantener la seguridad de la conexión.
