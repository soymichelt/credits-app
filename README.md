# Credit App v0.0.1

## Descripción

Aplicación de prueba implementada con TypeScript, que sigue las pautas de **Domain Driven Design** y que fue diseñada usando como base la Arquitectura Hexagonal. La infraestructura de la aplicación cuenta de dos partes: los `controladores` que fueron desarrollados con ExpressJS y los `repositorios` implementan MongoDB. Para el desarrollo de pruebas el proyecto cuenta con la configuración de Jest.

Para respetar las **buenas prácticas** el proyecto cuenta con una configuración de ESLint y de Prettier, con reglas bases de código y la guía de estilos de TypeScript recomendada. Ambos procesos se están ejecutando, en conjunto con los `tests`, en un sistema de Integración Continua (CI) y Despliegue Continuo (CD), que fue configurado usando GitHub Actions con Railway App. El CI y CD están escuchando los eventos de **Push** y **Pull Request** en la rama `Main`.

## Instalación

En la raíz del proyecto ejecutar el comando:

`npm install`

Cree un archivo llamado `.env` en donde deberá agregar las variables de entorno establecidas en el archivo `.env.example`.

- `NODE_ENV`: permite configurar el ambiente en el que correra la aplicación. Valores posibles: `production`, `development`.
- `PORT`: permite configurar el puerto en el que correra la aplicación. Este valor es **opcional**, sino lo configura la app correra en el puerto 8900.
- `MONGO_URL`: la conexión del servidor de mongo en el que va a correr. Este valor debe ser una **SRV address**, ya que debe incluir usuario y password.
- `MONGO_DATABASE_NAME`: es el nombre de la base de datos a la que desea conectarse. Este valor es opcional, sino lo agrega por defecto será `creditsDb`.
- `SENTRY_DSN`: es el DSN de sentry para el tracking de errores. Este valor es opcional, sino se agrega se descartará la configuración de SENTRY para tracking de errores.

# Ejecucición de la App

Para ejecutar el proyecto en desarrollo ejecute el comando:

`npm run dev`

Para compilar la aplicación ejecute el comando:

`npm run build`

**NOTA**: Esto ejecutará el proceso de ESLint y los tests.

Para ejecutar el compilado de la carpeta `/dist` ejecute el comando `npm run start`

## Documentación

Cuendo la aplicación está corriendo, expone una URL en el path `http://localhost:<YOUR PORT>/docs`. Ahí se encuentra la especificación de la API, desarrollada con **Swagger UI**, desde donde puedes consultar los diferentes endpoints disponibles.

- **GET** `/customer`: permite obtener todos los `Customers`. Este endpoint puede recibir un parametro de query `customerToShow`. Los valores permitidos para el parámetro son:
  - `0 = all`: Esta el valor por defecto y retorna todos los `Customers`.
  - `1 = onlyWithCredit`: Este valor permite seleccionar todos los `Customers` que tengan crédito habilitado.
  - `2 = onlyWithoutCredit`: Este valor permite seleccionar todos los `Customers` que no tengan crédito habilitado.

La respuesta de este endpoint será lo siguiente:

```
  {
    message? string
    error? string
    data Array<Customer> [{
      id	UUID
      dni	string
      names	string
      lastnames	string
      ageDate	string
      email	string
      phone	string
      income	number
      amountAvailableOfCredit	number
    }]
  }
```

- **GET** `/customer/{id}`: permite obtener un `Customer` filtrado por el parámetro `{id}`. El tipo del parámetro `{id}` debe ser de tipo UIID v4.

La respuesta de este endpoint será lo siguiente:

```
  {
    message? string
    error? string
    data Customer {
      id	UUID
      dni	string
      names	string
      lastnames	string
      ageDate	string
      email	string
      phone	string
      icome	number
      amountAvailableOfCredit	number
    }
  }
```

- **POST** `/customer`: permite crear un `Customer`. Es requerido enviar por body los siguientes parámetros:

```
  {
    id	UUID
    dni	string
    names	string
    lastnames	string
    ageDate	string
    email	string
    phone	string
    income	number
  }
```

- **PUT** `/customer/{id}`: permite actualizar un `Customer`. Es requerido enviar por body los siguientes parámetros:

```
  {
    id	UUID
    dni	string
    names	string
    lastnames	string
    ageDate	string
    email	string
    phone	string
    income	number
  }
```

- **DELETE** `/customer/{id}`: permite eliminar un `Customer` filtrado por `{id}`.

- PUT `/customer/{id}`: permite agregar un crédito a un `Customer` filtrado por `{id}`. Es requerido enviar por body los siguientes parámetros:

```
  {
    amountAvailableOfCredit	number
  }
```

## Depuración

La aplicación actualmente está configurada para utilizar SENTRY como plataforma Cloud para tracking de errores. Para poder utilizarlo solo configure la variable de entorno `SENTRY_DSN` y empezará a recibir notificaciones de errores de su aplicación.

## Demo

Puede consultar una demo de la aplicación ejecutándose en la siguiente URL:

https://credits-app-production.up.railway.app/docs/

No olvide seleccionar el Scheme HTTPS 😅

![imagen](https://user-images.githubusercontent.com/17261237/191336725-c30a2cab-d2c3-4303-b1f5-b306b7e30449.png)
