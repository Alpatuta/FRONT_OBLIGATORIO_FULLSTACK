# RecetasApp — Frontend

Aplicación web para gestión de recetas de cocina, desarrollada como Obligatorio 2 de Desarrollo Fullstack en la Universidad ORT Uruguay. Consume la API REST del Obligatorio 1.

## Descripción

SPA (Single Page Application) que permite registrarse, iniciar sesión y gestionar recetas desde un dashboard unificado. Incluye generación y adaptación de recetas mediante IA (Google Gemini), visualización de métricas en tiempo real, gráficos estadísticos y gestión de plan de usuario.

## Tecnologías

| Herramienta | Versión | Uso |
|---|---|---|
| React | 19.x | UI |
| Vite | 8.x | Bundler / Dev server |
| Redux Toolkit | 2.x | Estado global |
| React Router | 7.x | Navegación |
| React Hook Form | 7.x | Manejo de formularios |
| Joi | 18.x | Validación de formularios |
| Chart.js + react-chartjs-2 | 4.x / 5.x | Gráficos |
| Axios | 1.x | Peticiones HTTP a la API |
| jwt-decode | 4.x | Lectura del token JWT |
| Sonner | 2.x | Notificaciones toast |

## Estructura del proyecto

```
src/
├── api/
│   └── api.js                      # Instancia de Axios con base URL y token
├── components/
│   ├── SeccionLogin/               # Pantalla de login
│   ├── SeccionRegistro/            # Pantalla de registro
│   └── SeccionDashboard/
│       ├── Sidebar/                # Navegación lateral
│       └── Main/
│           ├── SeccionMain/        # Métricas generales
│           ├── SeccionDashboardAlta/      # Formulario de alta de receta
│           ├── SeccionDashboardListado/   # Listado, filtros, edición y eliminación
│           ├── SeccionDashboardGrafico/   # Gráfico estadístico
│           ├── SeccionCategorias/         # CRUD de categorías
│           ├── SeccionReviews/            # CRUD de reviews
│           ├── SeccionGenerarIA/          # Generar receta con IA
│           ├── SeccionAdaptarIA/          # Adaptar receta con IA
│           └── SeccionMiPlan/             # Información y cambio de plan
├── context/
│   └── DashboardContext.jsx        # Context para estado local del dashboard
├── features/
│   └── auth/
│       └── auth.slice.js           # Slice de Redux para autenticación
├── pages/                          # Páginas con React Router
├── store/
│   └── store.js                    # Configuración del store de Redux
└── validators/                     # Schemas de Joi por entidad
```

## Funcionalidades

### Autenticación
- **Registro**: formulario con validación en tiempo real. El botón de registrar se deshabilita si algún campo es inválido. Auto-login tras registro exitoso.
- **Login**: acceso al dashboard tras éxito. Botón deshabilitado si hay campos vacíos.
- **Logout**: cierra sesión y redirige al login.
- **Rutas protegidas**: componente `ProtectedRoute` que verifica el token JWT.

### Dashboard (vista única)

| Sección | Descripción |
|---|---|
| **Métricas** | Resumen de recetas totales, categorías y estadísticas en tiempo real |
| **Alta de receta** | Formulario completo con imagen, categoría y dificultad. Respeta el límite del plan plus (4 recetas) |
| **Listado de recetas** | Lista todas las recetas del usuario con filtros, edición inline y eliminación |
| **Gráfico** | Visualización de datos relevantes con Chart.js (actualización en tiempo real al crear una receta) |
| **Categorías** | CRUD completo de categorías |
| **Reviews** | CRUD de reseñas por receta |
| **Generar con IA** | Envía ingredientes y dificultad a Gemini para generar una receta completa |
| **Adaptar con IA** | Selecciona una receta existente y el tipo de adaptación (vegana, sin gluten, etc.) |
| **Mi Plan** | Muestra el plan actual (plus / premium) y permite el upgrade a premium |

### Informe de uso
- Usuarios **plus**: muestra el porcentaje de uso (recetas usadas / 4 máximas).
- Usuarios **premium**: muestra la cantidad total de recetas sin límite.

## Estado global (Redux)

El store gestiona la información de autenticación del usuario (token, datos de perfil) accesible desde cualquier componente. El estado del dashboard se complementa con un `DashboardContext` para datos de sesión de la vista.

## Instalación y uso local

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

La aplicación quedará disponible en `http://localhost:5173`.

## Variables de entorno

Crear un archivo `.env` en la raíz:

```env
VITE_API_URL=https://obligatorio-fullstack-six.vercel.app/V1
```

## Deploy

La aplicación está desplegada en **Vercel**: https://front-obligatorio-fullstack.vercel.app
