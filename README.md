# FRONENT-DIVEN

FRONENT-DIVEN es un proyecto escrito en [REACT](https://reactjs.org/docs/getting-started.html) que implementa la aplicación web de DIVEN.

## Requisitos desarrollo

- Node>= v16.14.0
- NPM >= 8.3.1
- Yarn >=1.22.17


## Scripts disponibles

En el directorio del proyecto, puede ejecutar:

### `yarn`

Para instalar las dependencias necesarias.

### `yarn start`

Ejecuta la aplicación en el modo de desarrollo.\
Abra [http://localhost:3000](http://localhost:3000) para verlo en su navegador.

La página se volverá a cargar cuando realice cambios.\
También puede ver errores de pelusa en la consola.

### `yarn test`

Inicia el corredor de prueba en el modo de reloj interactivo.\
Consulte la sección sobre [ejecutar pruebas] (https://facebook.github.io/create-react-app/docs/running-tests) para obtener más información.

### `yarn build`

Construye la aplicación para producción en la carpeta `build`.\
Empaqueta correctamente React en modo de producción y optimiza la compilación para obtener el mejor rendimiento.

La compilación se minimiza y los nombres de archivo incluyen los hashes.\
¡Tu aplicación está lista para ser implementada!

Consulte la sección sobre [implementación](https://facebook.github.io/create-react-app/docs/deployment) para obtener más información.

### `yarn eject`

**Nota: esta es una operación unidireccional. ¡Una vez que te 'expulsas', no puedes volver atrás!**

Si no está satisfecho con la herramienta de compilación y las opciones de configuración, puede "expulsar" en cualquier momento. Este comando eliminará la dependencia de compilación única de su proyecto.

En cambio, copiará todos los archivos de configuración y las dependencias transitivas (webpack, Babel, ESLint, etc.) directamente en su proyecto para que tenga control total sobre ellos. Todos los comandos, excepto "expulsar", seguirán funcionando, pero apuntarán a los scripts copiados para que pueda modificarlos. En este punto estás por tu cuenta.

No tienes que usar nunca `eject`. El conjunto de funciones seleccionadas es adecuado para implementaciones pequeñas y medianas, y no debe sentirse obligado a usar esta función. Sin embargo, entendemos que esta herramienta no sería útil si no pudiera personalizarla cuando esté listo para hacerlo.


### Despliegue

**Nota: Previamente tiene que tener instalado las dependencias.**

1. Copie el archivo .env.example a la ruta raíz del proyecto con el nombre .env.production

2. Llene las siguientes variables con la información requerida.

  - **REACT_APP_API_URL:** URL del **API RESET** de diven, por ejemplo https://api-diven.midominio.com

3. Ejecute `yarn build`, este generara una carpeta build la que debe subir a su servidor web.

## License
The FRONENT-DIVEN is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).



