# Movies App

SPA para descubrir películas, gestionar favoritas y consultar fichas detalladas de películas, actores y directores.

## Descripción

Movies App es una aplicación web que permite explorar el catálogo de películas de TMDB, buscar por texto, ver fichas detalladas y guardar favoritas. Desarrollada como proyecto de bootcamp con React + Vite.

## Funcionalidades

- Pantalla de bienvenida con navegación a exploración e inicio de sesión
- Listado de películas populares con scroll infinito
- Búsqueda de películas por texto en tiempo real
- Estados de carga, error y vacío
- Imagen por defecto cuando no hay póster disponible

## Stack técnico

| Tecnología | Uso |
|---|---|
| React 19 | Librería de UI |
| Vite | Bundler y servidor de desarrollo |
| pnpm | Gestor de paquetes |
| React Router DOM v7 | Enrutamiento SPA |
| TMDB API | Fuente de datos de películas |
| Firebase | Autenticación y base de datos (próximamente) |
| CSS puro con variables | Estilos sin frameworks externos |

## Instalación en local

### Requisitos previos

- Node.js 18+
- pnpm instalado globalmente (`npm install -g pnpm`)
- Cuenta en [TMDB](https://www.themoviedb.org/) para obtener el token de API

### Pasos

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/movies-app.git
cd movies-app
```

2. Instala las dependencias:
```bash
pnpm install
```

3. Crea el archivo `.env` en la raíz del proyecto:
```
VITE_TMDB_TOKEN=tu_token_de_tmdb_aqui
```

4. Arranca el servidor de desarrollo:
```bash
pnpm dev
```

5. Abre el navegador en `http://localhost:5173`

## Estructura del proyecto

```
src/
├── components/
│   ├── layout/       # Navbar
│   ├── movie/        # MovieCard
│   └── ui/           # LoadingSpinner, ErrorMessage, EmptyState
├── config/           # Rutas y textos centralizados
├── hooks/            # useMovies, useIntersectionObserver
├── pages/            # WelcomePage, ExplorePage, ...
├── router/           # AppRouter
└── services/         # tmdb.js
```

## Variables de entorno

| Variable | Descripción |
|---|---|
| `VITE_TMDB_TOKEN` | Token Bearer de autenticación de la API de TMDB |

## Autor

Desarrollado por Lia Fernández — FemCoders Bootcamp 2026
