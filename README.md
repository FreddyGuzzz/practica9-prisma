# Práctica 8 - API del gimnasio con Prisma

Esta es mi práctica de Aplicaciones Web (ITSON). Agarré la API del gimnasio que ya tenía con NestJS, le quité los repositorios que guardaban todo en memoria y ahora todo se guarda en MySQL con Prisma. De pasada le puse validación de datos, un filtro para los errores y CORS.

## Cómo correrlo

1. Instalar las dependencias:
   ```
   npm install
   ```
2. Copiar `.env.example` a `.env` y poner mis datos de MySQL (usuario, contraseña, y el nombre de la base `gimnasio`). Ojo que hay que llenar tanto `DATABASE_URL` como las variables sueltas (`DATABASE_HOST`, etc.), porque el CLI de Prisma usa la primera y la app usa las otras.
3. Crear las tablas:
   ```
   npx prisma migrate dev
   ```
4. Levantar la API:
   ```
   npm run start:dev
   ```
5. Abrir `peticiones.http` en VS Code (con la extensión REST Client) y darle a "Send Request" a cada una.

Si al arrancar dice que no encuentra `generated/prisma/client`, es que falta correr `npx prisma generate` (el `migrate dev` ya lo hace solo).

## Qué hice en cada paso

**1 y 2. Prisma en las cuatro entidades.** Creé `PrismaService` (con el driver adapter de MariaDB/MySQL) y `PrismaModule` con `@Global()` para no tener que importarlo en cada módulo. Después hice un repositorio de Prisma por cada entidad, cambié el `useClass` en cada módulo y borré los repositorios en memoria. El de Inscripción, además del CRUD, tiene `buscarPorHorario`, `buscarHorario` y `buscarMiembro`.

**3 y 4. Validación.** Los DTO pasaron de interfaces a clases con decoradores de `class-validator` (`@IsInt`, `@IsEmail`, `@IsIn`, etc.). En `main.ts` puse el `ValidationPipe` global con `whitelist`, `forbidNonWhitelisted`, `transform` y `forbidUnknownValues`.

**5. Filtro de excepciones.** Hice una clase base `ErrorDominio` y un filtro que atrapa esa clase (no cada error suelto). Los dos "no existe" salen como 404, los dos de reglas del gimnasio (cupo lleno y duplicado) como 409, y siempre responde con la misma forma: `statusCode`, `error`, `message`, `path` y `timestamp`.

**6. CORS.** Solo dejé pasar `http://localhost:5173` y `http://localhost:4200`, y expuse las cabeceras `Location` y `X-Request-Id`.

## Respuestas a las preguntas

**Paso 1: ¿qué línea del Service o del Controller tuvo que cambiar para que Clases hablara con MySQL?**

Ninguna. Lo único que cambié fue una línea en `clases.module.ts`: el `useClass` pasó de `ClaseMemoriaRepository` a `ClasePrismaRepository`. El Service y el Controller solo conocen a `ClaseRepository` (el contrato), nunca supieron quién lo implementaba, así que ni se enteraron del cambio.

**Paso 2: ¿por qué InscripcionesService no tuvo que cambiar ni una línea de las reglas de cupo y duplicados?**

Porque esas reglas están escritas con lo que le devuelve el repositorio: trae los inscritos con `buscarPorHorario`, revisa si el miembro ya está en la lista y compara la cantidad contra `cupoMaximo`. Eso es lógica pura sobre datos; no le importa si los datos vinieron de un arreglo o de MySQL. Lo único que cambió fue de dónde salen los datos, y eso vive en el repositorio.

**Paso 3: ¿por qué una interfaz no puede validar nada en tiempo de ejecución?**

Porque las interfaces de TypeScript solo existen mientras se compila. Cuando el código se convierte a JavaScript desaparecen por completo, y el JSON que llega en la petición es un objeto normal sin ninguna información de tipos. Una clase sí sobrevive al compilar, y los decoradores le guardan metadatos que `class-validator` puede leer cuando la petición ya está corriendo.

**Paso 4: ¿qué código de estado responde y qué trae en el cuerpo?**

Responde **400 Bad Request**. Con el tipo equivocado (mandé `"duracionMinutos": "sesenta"`) el cuerpo fue:

```json
{
  "message": [
    "duracionMinutos must not be less than 1",
    "duracionMinutos must be an integer number"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

Y con un campo que no existe en el DTO (mandé `"color": "rojo"`):

```json
{
  "message": ["property color should not exist"],
  "error": "Bad Request",
  "statusCode": 400
}
```

La opción indispensable es `forbidUnknownValues: true`. Sin ella, si por error el DTO no tiene decoradores (o es una interfaz), el objeto pasa como "desconocido" y la validación no hace nada y tampoco avisa. Con ella truena en vez de dejar pasar todo en silencio.

**Paso 5: ¿cuántas líneas quedó más corto el controlador?**

22 líneas. El controlador de inscripciones tenía 67 con el `try/catch` (y los imports de los errores y de las excepciones de Nest) y quedó en 45. Los conflictos siguen respondiendo 409, ahora con el mensaje, la ruta y la marca de tiempo:

```json
{
  "statusCode": 409,
  "error": "Conflict",
  "message": "El horario 1 ya no tiene cupo",
  "path": "/inscripciones",
  "timestamp": "2026-09-29T01:44:42.250Z"
}
```

**Paso 6: si la respuesta llega en los dos casos, ¿quién bloquea realmente y a quién protege?**

Cuando probé con el origen permitido (`http://localhost:5173`) la respuesta trajo `Access-Control-Allow-Origin`. Con un origen que no está en la lista (`http://sitio-malo.com`) la respuesta llegó igual, con 200, pero sin esa cabecera. El servidor no bloquea nada, solo contesta y avisa quién puede leerla. Quien bloquea es el **navegador**: si no ve la cabecera, no le deja al JavaScript de esa página leer la respuesta. Protege al **usuario** que tiene el navegador abierto, para que una página maliciosa no pueda usar su sesión para leer datos de otro sitio. No protege a la API: alguien con `curl` o Postman se salta el CORS sin problema.

## Cosas que le faltan (pa' ser honesto)

- Si mando un `claseId` que no existe al crear un horario, o un correo repetido al crear un miembro, Prisma lanza su propio error y la API responde 500. No lo manejé porque no venía en las indicaciones.
- No se puede borrar una clase que ya tiene horarios (por la llave foránea).
- No hice pruebas automáticas, solo el archivo `peticiones.http`.

## Entrega

- [ ] Repositorio público en GitHub (sin `node_modules` ni `.env`, el `.gitignore` ya los deja fuera)
- [ ] Enlace subido a iVirtual
- [ ] Captura de un 400 de validación
- [ ] Captura de un 409 traducido por el filtro
- [ ] Captura de los encabezados de CORS con los dos orígenes
