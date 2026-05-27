# Movies App — Documentación del código

SPA para descubrir películas, gestionar favoritas y consultar fichas detalladas de películas, actores y directores.

**Stack:** React + Vite + pnpm | React Router | Firebase | API TMDB

---

## 🎨 Estilos globales — `index.css`

Define las variables CSS globales y los estilos base que aplican a toda la app.

**Variables de color:**

| Variable | Valor | Uso |
|---|---|---|
| `--color-bg` | `#131313` | Fondo general de la app |
| `--color-accent` | `#F5C518` | Dorado — color principal de acento |
| `--color-accent-dark` | `#241A00` | Texto sobre botón dorado |
| `--color-accent-muted` | `rgba(245,197,24,0.2)` | Dorado semitransparente para badges |
| `--color-text-primary` | `#E5E2E1` | Texto principal |
| `--color-text-secondary` | `#D1C5AC` | Texto secundario y labels |
| `--color-text-placeholder` | `#6B7280` | Placeholder de inputs |
| `--color-white` | `#FFFFFF` | Blanco puro |
| `--color-overlay` | `rgba(255,255,255,0.05)` | Fondo de tarjetas y botones secundarios |
| `--color-border` | `rgba(255,255,255,0.1)` | Bordes de tarjetas |
| `--color-border-secondary` | `rgba(255,255,255,0.3)` | Borde botón secundario |
| `--color-nav-bg` | `rgba(19,19,19,0.8)` | Fondo del navbar con blur |

**Variables de tipografía:**

| Variable | Valor | Uso |
|---|---|---|
| `--font-title` | `Playfair Display` | Títulos, logo, nombres de películas |
| `--font-body` | `Inter` | Textos, botones, labels |

**Variables de forma:**

| Variable | Valor | Uso |
|---|---|---|
| `--radius-sm` | `4px` | Botones principales |
| `--radius-md` | `8px` | Tarjetas de película |
| `--radius-lg` | `12px` | Botones de filtro e inputs |
| `--shadow-accent` | sombra dorada | Botón primario "Explorar" |

**Reset base:** elimina márgenes y paddings por defecto del navegador. Define fondo oscuro, texto claro y fuente Inter en `body`.

---

## 📁 config/

Constantes y configuración global de la aplicación. No contienen lógica, solo datos estáticos.

### `routes.js`
Define todas las rutas de la aplicación como constantes en el objeto `ROUTES`.
Centraliza las rutas para que ningún componente escriba strings de ruta a mano — si una ruta cambia, se cambia aquí y se actualiza en toda la app.

| Constante | Ruta |
|---|---|
| `HOME` | `/` |
| `LOGIN` | `/login` |
| `EXPLORE` | `/explore` |
| `MOVIE_DETAIL` | `/movie/:id` |
| `ACTOR_DETAIL` | `/actor/:id` |
| `DIRECTOR_DETAIL` | `/director/:id` |
| `FAVORITES` | `/favorites` |
| `PROFILE` | `/profile` |
| `NOT_FOUND` | `*` |

### `texts.js`
Centraliza todos los textos visibles en la UI en el objeto `TEXTS`, organizado por sección.
Evita strings dispersos por los componentes. Si un texto cambia o se traduce, se modifica aquí.

| Sección | Uso |
|---|---|
| `app` | Nombre de la aplicación |
| `welcome` | Pantalla de bienvenida |
| `nav` | Menú de navegación |
| `explore` | Sección de exploración y estados (carga, vacío, error) |
| `movieDetail` | Ficha detallada de película |
| `actorDetail` | Ficha detallada de actor |
| `directorDetail` | Ficha detallada de director |
| `favorites` | Sección de favoritas |
| `profile` | Sección de perfil |
| `login` | Formulario de login |
| `errors` | Mensajes de error genéricos |

---

## 📁 services/

Módulos que se comunican con APIs externas o Firebase. Los componentes nunca llaman directamente a APIs — siempre pasan por un servicio.

### `tmdb.js`
Servicio centralizado para la API de TMDB. Exporta el objeto `tmdb` con un método por consulta.
Internamente usa `fetchTMDB`, una función base privada que gestiona la URL, el token de autenticación (desde `VITE_TMDB_TOKEN` en `.env`) y los errores de red.

| Método | Descripción |
|---|---|
| `getPopularMovies(page)` | Listado de películas populares paginado |
| `getTrendingMovies(page)` | Películas en tendencia esta semana |
| `searchMovies(query, page)` | Búsqueda por texto con paginación |
| `getMoviesByGenre(genreId, page)` | Filtrado por género con paginación |
| `getGenres()` | Lista de géneros disponibles |
| `getMovieDetail(id)` | Detalle de película con reparto y vídeos |
| `getActorDetail(id)` | Detalle de actor con su filmografía |
| `getImageUrl(path, size)` | URL completa de imagen o `null` si no hay imagen |

## 📁 hooks/

Custom hooks de React. Encapsulan lógica reutilizable (llamadas a servicios, gestión de estado local) para mantener los componentes limpios.

### `useMovies.js`

Hook que gestiona la llamada a la API de TMDB y devuelve el estado resultante a quien lo use.

**Flujo:**
1. Al montarse, llama a `tmdb.getPopularMovies()`
2. Si va bien → guarda las películas en `movies` y desactiva `loading`
3. Si falla → guarda el mensaje en `error` y desactiva `loading`

**Devuelve:**

| Variable | Tipo | Valor inicial | Descripción |
|---|---|---|---|
| `movies` | array | `[]` | Lista de películas de la API |
| `loading` | boolean | `true` | `true` mientras espera respuesta |
| `error` | string o null | `null` | Mensaje de error si la llamada falla |

**Uso:**
```js
const { movies, loading, error } = useMovies();
```

## 📁 context/

Contextos de React para estado global (autenticación, usuario...).

## 📁 router/

Configuración del enrutador de la aplicación.

### `AppRouter.jsx`
Componente raíz del sistema de rutas. Usa `BrowserRouter` de React Router para que la URL cambie sin recargar la página.
Define una `Route` por cada página de la app usando las constantes de `ROUTES` — nunca strings de ruta escritos a mano.
La ruta `*` captura cualquier URL no reconocida y muestra `NotFoundPage`.

## 📁 pages/

Una carpeta por página. Cada página es el componente raíz de una ruta.

Estructura de páginas:

```
src/pages/
├── WelcomePage/
│   └── WelcomePage.jsx
├── ExplorePage/
│   └── ExplorePage.jsx
├── MovieDetailPage/
│   └── MovieDetailPage.jsx
├── ActorDetailPage/
│   └── ActorDetailPage.jsx
├── DirectorDetailPage/
│   └── DirectorDetailPage.jsx
├── FavoritesPage/
│   └── FavoritesPage.jsx
├── ProfilePage/
│   └── ProfilePage.jsx
├── LoginPage/
│   └── LoginPage.jsx
└── NotFoundPage/
    └── NotFoundPage.jsx
```

### `WelcomePage/WelcomePage.jsx`
Primera pantalla que ve el usuario al abrir la app.
Muestra título, subtítulo y dos botones: uno para ir a explorar películas y otro para iniciar sesión.
Usa `useNavigate` de React Router para navegar sin recargar la página, `TEXTS.welcome` para los textos y `ROUTES` para las rutas — sin ningún string hardcodeado.

### `ExplorePage/ExplorePage.jsx`
Página de exploración de películas. Placeholder inicial — se desarrollará en la Épica 1.

### `MovieDetailPage/MovieDetailPage.jsx`
Ficha detallada de una película. Placeholder inicial — se desarrollará en la Épica 2.

### `ActorDetailPage/ActorDetailPage.jsx`
Ficha detallada de un actor. Placeholder inicial — se desarrollará en la Épica 2.

### `DirectorDetailPage/DirectorDetailPage.jsx`
Ficha detallada de un director. Placeholder inicial — se desarrollará en la Épica 2.

### `FavoritesPage/FavoritesPage.jsx`
Lista de películas favoritas del usuario. Placeholder inicial — se desarrollará en la Épica 4.

### `ProfilePage/ProfilePage.jsx`
Perfil del usuario. Placeholder inicial — se desarrollará en la Épica 5.

### `LoginPage/LoginPage.jsx`
Formulario de inicio de sesión. Placeholder inicial — se desarrollará en la Épica 3.

### `NotFoundPage/NotFoundPage.jsx`
Página 404. Se muestra cuando la URL no coincide con ninguna ruta definida.

## 📁 components/

Componentes reutilizables compartidos entre páginas.

### `movie/MovieCard.jsx`

Tarjeta que representa una película en el listado de exploración.

Recibe una prop `movie` con los datos de la API de TMDB y muestra:
- El póster de la película (o `/no-poster.jpg` si no hay imagen)
- El título
- El año de estreno (extraído de `release_date` con `slice(0, 4)`)
- La puntuación media redondeada a un decimal (`toFixed(1)`)

**Conceptos clave:**

| Concepto | Dónde | Qué hace |
|---|---|---|
| Props | `{ movie }` | Recibe los datos de la película del componente padre |
| `?.` optional chaining | `release_date?.slice(0, 4)` | Evita error si el campo no existe |
| `??` nullish coalescing | `posterUrl ?? "/no-poster.jpg"` | Usa imagen por defecto si no hay póster |
| `toFixed(1)` | `vote_average?.toFixed(1)` | Redondea la puntuación a un decimal |
| BEM | clases `movie-card__title` | Convención de nomenclatura CSS: bloque__elemento |

**Estructura HTML:**
```
article.movie-card
├── img.movie-card__poster
└── div.movie-card__info
    ├── h3.movie-card__title
    └── div.movie-card__meta
        ├── span.movie-card__year
        └── span.movie-card__rating
```

### `movie/MovieCard.css`

Estilos de la tarjeta de película.

| Propiedad | Dónde | Qué hace |
|---|---|---|
| `overflow: hidden` | `.movie-card` | Evita que el póster sobresalga del borde redondeado |
| `transform: translateY(-4px)` | `.movie-card:hover` | Eleva la tarjeta al pasar el ratón |
| `transition` | `.movie-card` | Suaviza el efecto hover |
| `aspect-ratio: 2 / 3` | `.movie-card__poster` | Mantiene la proporción del póster aunque tarde en cargar |
| `object-fit: cover` | `.movie-card__poster` | Rellena el espacio sin deformar la imagen |
| `-webkit-line-clamp: 2` | `.movie-card__title` | Corta el título a 2 líneas y añade `...` si es más largo |

### `ui/LoadingSpinner.jsx`

Componente funcional que muestra un spinner animado mientras se espera respuesta de la API.

No recibe props — siempre muestra lo mismo.

**Estructura HTML:**
```
div.spinner-wrapper
└── div.spinner
```

### `ui/LoadingSpinner.css`

| Propiedad | Dónde | Qué hace |
|---|---|---|
| `border-top-color: var(--color-accent)` | `.spinner` | Un lado del círculo en dorado — crea el efecto spinner |
| `border-radius: 50%` | `.spinner` | Convierte el cuadrado en círculo |
| `animation: spin 0.8s linear infinite` | `.spinner` | Aplica la animación de rotación infinita |
| `@keyframes spin` | global | Define la rotación de 0 a 360 grados |

### `ui/ErrorMessage.jsx`

Componente funcional que muestra un mensaje de error y un botón de reintentar.

**Props:**

| Prop | Tipo | Descripción |
|---|---|---|
| `message` | string | Texto del error que viene de `useMovies` |
| `onRetry` | función | Se ejecuta cuando el usuario pulsa "Reintentar" |

**Estructura HTML:**
```
div.error-message
├── p.error-message__text
└── button.btn-primary
```

### `ui/EmptyState.jsx`

Componente funcional que muestra un mensaje cuando la búsqueda no devuelve resultados.

No recibe props — siempre muestra el mismo mensaje.

**Estructura HTML:**
```
div.empty-state
└── p.empty-state__text
```

---

## 📁 hooks/ — actualizaciones

### `useMovies.js` — scroll infinito

Se añadieron dos estados nuevos y la función `loadMore` para soportar paginación:

| Variable | Tipo | Descripción |
|---|---|---|
| `page` | número | Página actual, empieza en 1 |
| `hasMore` | boolean | `true` si hay más páginas disponibles |
| `loadMore` | función | Incrementa `page` en 1 para cargar más películas |

**Cambios clave:**
- `setMovies((prev) => [...prev, ...data.results])` — acumula películas en vez de reemplazarlas
- `[page]` en `useEffect` — el efecto se dispara cada vez que `page` cambia
- `useCallback` — evita que `loadMore` se recree en cada render

### `useIntersectionObserver.js`

Custom hook que detecta cuando un elemento HTML aparece en la pantalla del usuario.

Se usa para saber cuándo el usuario llega al final de la lista y disparar `loadMore` automáticamente.

**Recibe:** `callback` — función que se ejecuta cuando el elemento es visible

**Devuelve:** `ref` — referencia que se adjunta al elemento a observar

**Cómo funciona:**
1. Crea un `IntersectionObserver` del navegador
2. Lo adjunta al elemento con `ref`
3. Cuando el elemento aparece en pantalla → llama al `callback`
4. Al desmontarse → desconecta el observer con `disconnect()`
