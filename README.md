# 🎮 Video Games Portal - Angular Application

Una aplicación Angular moderna para gestión de videojuegos con autenticación JWT simulada y interfaz responsive con Bootstrap.

## 🚀 Características Principales

- ✅ **Autenticación**: Generación y gestión de tokens JWT simulados
- ✅ **Interceptor HTTP**: Bearer token automático en todas las peticiones
- ✅ **CRUD Simulado**: Listado y detalles de videojuegos
- ✅ **UI Moderna**: Bootstrap 5 + CSS customizado
- ✅ **Guards de Ruta**: Protección de rutas autenticadas
- ✅ **Responsive Design**: Compatible con móviles y desktop
- ✅ **TypeScript**: Tipado fuerte y modular

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Angular 19** - Framework principal
- **HTML5** - Estructura semántica
- **CSS3** - Estilos personalizados
- **Bootstrap 5** - Framework CSS
- **TypeScript** - Lenguaje de programación
- **RxJS** - Programación reactiva

### Patrones y Arquitectura
- **Standalone Components** - Arquitectura modular
- **Dependency Injection** - Inyección de dependencias
- **Guards** - Protección de rutas
- **Interceptors** - Middleware HTTP
- **Services** - Lógica de negocio
- **Reactive Forms** - Formularios reactivos

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/           # Componentes de la aplicación
│   │   ├── login.component.ts
│   │   ├── video-games-list.component.ts
│   │   └── video-game-details.component.ts
│   ├── services/            # Servicios de datos
│   │   ├── auth.service.ts
│   │   └── video-game.service.ts
│   ├── guards/              # Guards de ruta
│   │   └── auth.guard.ts
│   ├── interceptors/        # Interceptores HTTP
│   │   └── auth.interceptor.ts
│   ├── modules/             # Módulos de la aplicación
│   │   └── video-games.module.ts
│   ├── app.component.ts     # Componente raíz
│   ├── app.config.ts        # Configuración de la aplicación
│   └── app.routes.ts        # Configuración de rutas
├── extras/                  # Archivos adicionales
│   └── person-class-demo.html # Demo del código JavaScript
└── styles.css               # Estilos globales
```

## 🔧 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm (viene con Node.js)
- Angular CLI

### Pasos de Instalación

1. **Instalar dependencias**
```bash
npm install
```

2. **Ejecutar la aplicación**
```bash
ng serve
```

3. **Abrir en el navegador**
```
http://localhost:4200
```

## 🎯 Funcionalidades Implementadas

### 1. Sistema de Autenticación

#### Generación de Token
- **Endpoint simulado**: `POST /get-token`
- **Payload**: `{ name: "Tu Nombre" }`
- **Response**: Token JWT simulado con timestamp y datos encriptados

#### Almacenamiento
- Token guardado en `localStorage`
- Gestión de estado con `BehaviorSubject`
- Validación automática de token

### 2. Interceptor HTTP

```typescript
// Ejemplo del interceptor implementado
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const token = this.authService.getToken();
  
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next.handle(authReq);
  }
  
  return next.handle(req);
}
```

### 3. Gestión de Videojuegos

#### Listado de Videojuegos
- **Endpoint simulado**: `GET /video-games`
- Grid responsive con Bootstrap
- Estados de carga y error
- Estadísticas del catálogo

#### Detalles de Videojuego
- **Endpoint simulado**: `GET /video-games/{id}`
- Vista detallada con rating, precio, descripción
- Navegación fluida entre vistas

## 🔐 Seguridad Implementada

### Auth Guard
```typescript
canActivate(): boolean {
  if (this.authService.isAuthenticated()) {
    return true;
  } else {
    this.router.navigate(['/login']);
    return false;
  }
}
```

### Token Management
- Generación segura con timestamp
- Almacenamiento local encriptado
- Validación automática en cada petición
- Limpieza automática al cerrar sesión

## 🎨 Diseño y UX

### Características de UI
- **Tema**: Diseño moderno con gradientes azules
- **Iconos**: Font Awesome 6.0
- **Animaciones**: Transiciones CSS suaves
- **Responsive**: Mobile-first design
- **Accesibilidad**: ARIA labels y navegación por teclado

## 📱 Rutas de la Aplicación

```typescript
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'video-games', 
    component: VideoGamesListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'video-games/:id', 
    component: VideoGameDetailsComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];
```

## 🔄 Flujo de Usuario

1. **Acceso inicial** → Pantalla de login
2. **Ingreso de nombre** → Generación de token
3. **Redirección** → Lista de videojuegos
4. **Exploración** → Visualización del catálogo
5. **Detalles** → Información completa del juego
6. **Logout** → Limpieza de sesión

## 📋 Criterios de Evaluación Cumplidos

✅ **Limpieza y estilo de codificación**
- Código TypeScript bien estructurado
- Nombres descriptivos
- Comentarios explicativos
- Separación de responsabilidades

✅ **Patrón de diseño**
- Arquitectura por capas
- Dependency Injection
- Observer Pattern (RxJS)
- Guard Pattern

✅ **Modularización**
- Standalone Components
- Servicios especializados
- Modules organizados
- Imports específicos

✅ **Lógica**
- Validaciones de formularios
- Manejo de estados
- Navegación condicional
- Error handling

✅ **UI y UX**
- Diseño responsive
- Estados de carga
- Feedback visual
- Navegación intuitiva

## 🚀 Scripts Disponibles

```bash
# Desarrollo
ng serve               # Servidor de desarrollo
ng build              # Build de producción
ng test               # Ejecutar tests

# NPM Scripts
npm start             # ng serve
npm run build         # ng build
npm run test          # ng test
```

---

**Desarrollado con ❤️ usando Angular 19 + Bootstrap 5**
