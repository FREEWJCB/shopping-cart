# ⚡ Next.js 15 - Starter Project

Este es un proyecto base usando **Next.js 15**, con soporte para App Router, Server Actions, API Routes, y TypeScript.

## 🚀 Requisitos

- Node.js >= 18.x
- Yarn o npm

## 📦 Instalación

Cloná el repositorio e instalá las dependencias:

yarn install
# o
npm install

## 🛠️ Comandos de desarrollo

### Levantar servidor de desarrollo

yarn dev
# o
npm run dev

Esto iniciará la app en:

http://localhost:3000

### Compilar para producción

yarn build
# o
npm run build

### Ejecutar app en producción (después de build)

yarn start
# o
npm run start

### Analizar el bundle (opcional)

yarn analyze
# o
npm run analyze

## 📁 Estructura del proyecto

app/                # Rutas (App Router)
├── page.tsx        # Página raíz
├── layout.tsx      # Layout principal
├── libs/            # Rutas API (Route Handlers)
├── components/            # Rutas API (Route Handlers)
components/         # Componentes reutilizables
public/             # Archivos públicos
.env                # Variables de entorno
next.config.js      # Configuración de Next.js
tsconfig.json       # Configuración de TypeScript

## 🌐 Variables de entorno

Crea un archivo `.env.local` basado en el siguiente ejemplo:

### .env.local

NEXT_PUBLIC_API_URL=http://localhost:3000/api

## ✅ Pruebas (si usás testing)

Para ejecutar pruebas (ej: con Vitest o Jest):

yarn test
# o
npm run test

## 🧩 Tecnologías usadas

- Next.js 15
- React 18
- TypeScript
- App Router
- Server Components / Server Actions
- TailwindCSS (opcional)

## 🧑‍💻 Autor

Este proyecto fue desarrollado por [Tu Nombre o Equipo].

## 🛡️ Licencia

MIT
