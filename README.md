# RedPatitas Frontend 🐾

> Aplicación Angular para adopción de mascotas

## 🚀 Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo (con proxy al backend)
ng serve

# Construir para producción
ng build
```

## 🔐 Inicio Panel Administrador

Para probar las funcionalidades CRUD, usar las siguientes credenciales:

```
Email: admin@redpatitas.com
Password: 123456
```

**Acceso:** http://localhost:4200/admin/login

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

## 🏗️ Arquitectura Angular

### **📁 Servicios (src/app/services/)**
- `adopcion.service.ts` - Comunicación con API adopción
- `perdidas.service.ts` - Comunicación con API perdidas

### **🎮 Componentes (src/app/components/)**
- `header.component.ts` - Cabecera de la aplicación
- `navbar.component.ts` - Navegación principal
- `footer.component.ts` - Pie de página

### **📄 Páginas (src/app/pages/)**
- `public/` - Páginas públicas (Home, Adopción, Perdidas)
- `admin/` - Panel administrativo (Login, Dashboard, CRUD)

### **🛡️ Guards (src/app/guards/)**
- `auth.guard.ts` - Protección de rutas administrativas

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

El frontend se conecta automáticamente al backend en puerto 3000 mediante proxy.

## 🔗 Rutas Principales

### **Públicas**
```
/                    # Home
/adopcion           # Mascotas en adopción
/mascotas-perdidas  # Reportes de perdidas
```

### **Administrativas**
```
/admin/login        # Login administrador
/admin/dashboard    # Panel de control
/admin/mascotas     # CRUD mascotas adopción
/admin/perdidas     # CRUD mascotas perdidas
```

## 🔗 Equipo de desarrollo MVPP (Muy viernes para programar)
Zacagnino Antonella - Reverol Gerarlis - Salva ivan - Singuri Roberto.

## 🔗 TP INTEGRADOR - DESARROLLO WEB (BACKEND - FRONTEND) IFTS11 2025
Zammataro Gustavo - Balbuena Federico
