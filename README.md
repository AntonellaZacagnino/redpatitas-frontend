# RedPatitas Frontend 🐾

> Aplicación Angular para adopción de mascotas

## 🚀 Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo (con proxy al backend)
npm start

# Construir para producción
npm run build
```

## 📱 Características

### Páginas Públicas
- **Home** - Página principal con estadísticas
- **Adopción** - Mascotas disponibles para adoptar
- **Mascotas Perdidas** - Reportes de mascotas perdidas

### Panel Administrativo
- **Login** - Autenticación (admin@redpatitas.com / 123456)
- **Dashboard** - Panel de control
- **CRUD Adopción** - Gestión de mascotas en adopción
- **CRUD Perdidas** - Gestión de reportes de mascotas perdidas

## 🛠️ Stack Tecnológico

- **Angular 20** - Framework frontend
- **Bootstrap 5** - Estilos y componentes
- **TypeScript** - Lenguaje de programación
- **Template-driven Forms** - Formularios

## 🔧 Configuración

- **Puerto:** 4200
- **Backend API:** http://localhost:3000 (via proxy)
- **Proxy:** Configurado en `proxy.conf.json`

## 📡 Conexión con Backend

El frontend se conecta automáticamente al backend en puerto 3000 mediante proxy configuration.