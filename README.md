# WoofFriend — Backend (API REST)

API REST para **WoofFriend**, una plataforma de adopción de mascotas. Gestiona el registro y autenticación de usuarios, la publicación de animales en adopción, los formularios de adopción, donaciones y publicaciones, incluyendo la carga de imágenes.

Proyecto desarrollado como trabajo de grado del Tecnólogo en Desarrollo de Software (SENA).

**Autor:** Kevin Lievano · lvrd07@gmail.com

---

## Tecnologías

- **NestJS** (Node.js + TypeScript)
- **PostgreSQL** con **TypeORM**
- **Docker / Docker Compose** (base de datos)
- **JWT + Passport** para autenticación
- **bcrypt** para el hash de contraseñas
- **class-validator / class-transformer** para validación de DTOs
- **Multer** para la carga de archivos (imágenes)
- **Swagger** para la documentación de la API

## Módulos principales

- `auth` — registro, login y protección de rutas con JWT.
- `animals` — gestión de animales en adopción.
- `form-adoption` — formularios de solicitud de adopción.
- `donations` — registro y gestión de donaciones.
- `publications` — publicaciones de la plataforma.
- `files` — carga y servido de imágenes.

## Requisitos previos

- Node.js 18+
- Docker y Docker Compose

## Cómo ejecutarlo

```bash
# 1. Instalar dependencias
npm install

# 2. Crear el archivo .env a partir del ejemplo y completar los valores
cp .env.example .env

# 3. Levantar la base de datos PostgreSQL en Docker
docker compose up -d

# 4. Iniciar el servidor en modo desarrollo
npm run start:dev
```

La API queda disponible en `http://localhost:3000` y la documentación Swagger en `http://localhost:3000/api`.

## Variables de entorno (.env)

```
DB_PASSWORD=
DB_NAME=
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=
PORT=3000
```

> Nota: el archivo `.env` no debe subirse al repositorio. Usa `.env.example` como plantilla.

## Frontend

La aplicación móvil que consume esta API está en el repositorio del frontend de WoofFriend (Flutter).
