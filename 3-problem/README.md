<h1 align="center">Navegador de Aventuras del Sombrero de Paja</h1>

Como miembro de la tripulación del Sombrero de Paja, tu misión es desarrollar una aplicación web que permita registrar y gestionar las ubicaciones y actividades de los miembros de la tripulación mientras buscan el One Piece.


# Problema frontEnd
 Diseñar una interfaz atractiva e intuitiva utilizando cualquier tecnologia

### Requisitos
* Registro de Actividades: Crear un formulario para que los usuarios puedan registrar actividades con detalles específicos.
* Lista y Detalles de Actividades: Mostrar una lista de actividades registradas y proporcionar vistas detalladas al seleccionar una actividad.
* Autenticación de Usuarios: Integrar autenticación básica para asegurar que solo los usuarios autorizados puedan agregar, editar o eliminar actividades.
* (PLUS) Mapa Interactivo: Implementar un mapa interactivo para visualizar las ubicaciones actuales y pasadas de las actividades de la tripulación.

#### colores
 * ![#1B2A49](https://via.placeholder.com/15/2E62A3/000000.png) #2E62A3
 * ![#FDEA69](https://via.placeholder.com/15/AF6528/000000.png) #AF6528
 * ![#97CE4C](https://via.placeholder.com/15/FFCD00/000000.png) #FFCD00
 * ![#97CE4C](https://via.placeholder.com/15/62C3F8/000000.png) #62C3F8

# Problema Backend
El objetivo es gestionar la creación, lectura, actualización y eliminación de actividades.
### Requisitos

* Base de Datos de Dimensiones: Establece una base de datos para almacenar información sobre las actividades y aventuras
* API REST: Desarrolla una API REST para manejar las operaciones CRUD en las actividades. Esta API será el puente entre tu interfaz de usuario y la base de datos.
* Autenticación: Implementa un sistema de autenticación para asegurarte de que solo tú (o personas autorizadas) puedan modificar la información de las actividades.


## pluss
* utilizar Doker
* test Unitarios


# swagger

```swagger
  openapi: 3.0.0
  info:
    title: Navegador de Aventuras del Sombrero de Paja API
    description: API para gestionar las actividades de la tripulación del Sombrero de Paja
    version: 1.0.0
  servers:
    - url: http://localhost:3000/api
  tags:
    - name: Usuarios
      description: Gestión de usuarios
    - name: Actividades
      description: Gestión de actividades

  paths:
    /register:
      post:
        tags:
          - Usuarios
        summary: Registro de nuevo usuario
        requestBody:
          description: Datos necesarios para registrar un nuevo usuario
          required: true
          content:
            application/json:
              schema:
                type: object
                properties:
                  username:
                    type: string
                    example: "luffy"
                  password:
                    type: string
                    example: "secret"
                  email:
                    type: string
                    example: "luffy@onepiece.com"
        responses:
          200:
            description: Usuario registrado exitosamente
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    message:
                      type: string
                      example: "Usuario registrado exitosamente"

    /login:
      post:
        tags:
          - Usuarios
        summary: Inicio de sesión
        requestBody:
          description: Datos necesarios para iniciar sesión
          required: true
          content:
            application/json:
              schema:
                type: object
                properties:
                  username:
                    type: string
                    example: "luffy"
                  password:
                    type: string
                    example: "secret"
        responses:
          200:
            description: Inicio de sesión exitoso
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    token:
                      type: string
                      example: "JWT token"

    /activities:
      post:
        tags:
          - Actividades
        summary: Crear una nueva actividad
        security:
          - bearerAuth: []
        requestBody:
          description: Datos de la nueva actividad
          required: true
          content:
            application/json:
              schema:
                type: object
                properties:
                  member:
                    type: string
                    example: "Zoro"
                  location:
                    type: object
                    properties:
                      latitude:
                        type: number
                        example: 34.052235
                      longitude:
                        type: number
                        example: -118.243683
                  activity:
                    type: string
                    example: "Entrenando con espadas"
                  description:
                    type: string
                    example: "Entrenando con espadas para mejorar habilidades"
                  imageUrl:
                    type: string
                    example: "http://example.com/image.jpg"
        responses:
          200:
            description: Actividad creada exitosamente
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    message:
                      type: string
                      example: "Actividad creada exitosamente"
                    activity:
                      type: object
                      properties:
                        _id:
                          type: string
                          example: "60c72b1f9b1e8c10f0d68a8a"
                        member:
                          type: string
                          example: "Zoro"
                        location:
                          type: object
                          properties:
                            latitude:
                              type: number
                              example: 34.052235
                            longitude:
                              type: number
                              example: -118.243683
                        activity:
                          type: string
                          example: "Entrenando con espadas"
                        description:
                          type: string
                          example: "Entrenando con espadas para mejorar habilidades"
                        imageUrl:
                          type: string
                          example: "http://example.com/image.jpg"
                        createdAt:
                          type: string
                          format: date-time
                          example: "2021-06-14T06:28:47.000Z"
                        updatedAt:
                          type: string
                          format: date-time
                          example: "2021-06-14T06:28:47.000Z"

      get:
        tags:
          - Actividades
        summary: Obtener todas las actividades
        security:
          - bearerAuth: []
        responses:
          200:
            description: Lista de actividades
            content:
              application/json:
                schema:
                  type: array
                  items:
                    type: object
                    properties:
                      _id:
                        type: string
                        example: "60c72b1f9b1e8c10f0d68a8a"
                      member:
                        type: string
                        example: "Zoro"
                      location:
                        type: object
                        properties:
                          latitude:
                            type: number
                            example: 34.052235
                          longitude:
                            type: number
                            example: -118.243683
                      activity:
                        type: string
                        example: "Entrenando con espadas"
                      description:
                        type: string
                        example: "Entrenando con espadas para mejorar habilidades"
                      imageUrl:
                        type: string
                        example: "http://example.com/image.jpg"
                      createdAt:
                        type: string
                        format: date-time
                        example: "2021-06-14T06:28:47.000Z"
                      updatedAt:
                        type: string
                        format: date-time
                        example: "2021-06-14T06:28:47.000Z"

    /activities/{id}:
      get:
        tags:
          - Actividades
        summary: Obtener detalles de una actividad
        security:
          - bearerAuth: []
        parameters:
          - name: id
            in: path
            required: true
            schema:
              type: string
            description: ID de la actividad
        responses:
          200:
            description: Detalles de la actividad
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    _id:
                      type: string
                      example: "60c72b1f9b1e8c10f0d68a8a"
                    member:
                      type: string
                      example: "Zoro"
                    location:
                      type: object
                      properties:
                        latitude:
                          type: number
                          example: 34.052235
                        longitude:
                          type: number
                          example: -118.243683
                    activity:
                      type: string
                      example: "Entrenando con espadas"
                    description:
                      type: string
                      example: "Entrenando con espadas para mejorar habilidades"
                    imageUrl:
                      type: string
                      example: "http://example.com/image.jpg"
                    createdAt:
                      type: string
                      format: date-time
                      example: "2021-06-14T06:28:47.000Z"
                    updatedAt:
                      type: string
                      format: date-time
                      example: "2021-06-14T06:28:47.000Z"

      put:
        tags:
          - Actividades
        summary: Actualizar una actividad
        security:
          - bearerAuth: []
        parameters:
          - name: id
            in: path
            required: true
            schema:
              type: string
            description: ID de la actividad
        requestBody:
          description: Datos actualizados de la actividad
          required: true
          content:
            application/json:
              schema:
                type: object
                properties:
                  member:
                    type: string
                    example: "Zoro"
                  location:
                    type: object
                    properties:
                      latitude:
                        type: number
                        example: 34.052235
                      longitude:
                        type: number
                        example: -118.243683
                  activity:
                    type: string
                    example: "Entrenando con espadas"
                  description:
                    type: string
                    example: "Entrenando con espadas para mejorar habilidades"
                  imageUrl:
                    type: string
                    example: "http://example.com/image.jpg"
        responses:
          200:
            description: Actividad actualizada exitosamente
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    message:
                      type: string
                      example: "Actividad actualizada exitosamente"
                    activity:
                      type: object
                      properties:
                        _id:
                          type: string
                          example: "60c72b1f9b1e8c10f0d68a8a"
                        member:
                          type: string
                          example: "Zoro"
                        location:
                          type: object
                          properties:
                            latitude:
                              type: number
                              example: 34.052235
                            longitude:
                              type: number
                              example: -118.243683
                        activity:
                          type: string
                          example: "Entrenando con espadas"
                        description:
                          type: string
                          example: "Entrenando con espadas para mejorar habilidades"
                        imageUrl:
                          type: string
                          example: "http://example.com/image.jpg"
                        createdAt:
                          type: string
                          format: date-time
                          example: "2021-06-14T06:28:47.000Z"
                        updatedAt:
                          type: string
                          format: date-time
                          example: "2021-06-14T06:28:47.000Z"

      delete:
        tags:
          - Actividades
        summary: Eliminar una actividad
        security:
          - bearerAuth: []
        parameters:
          - name: id
            in: path
            required: true
            schema:
              type: string
            description: ID de la actividad
        responses:
          200:
            description: Actividad eliminada exitosamente
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    message:
                      type: string
                      example: "Actividad eliminada exitosamente"

  components:
    securitySchemes:
      bearerAuth:
        type: http
        scheme: bearer
        bearerFormat: JWT

```