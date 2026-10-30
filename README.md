
# 🎮 SteamLite - Plataforma de Videojuegos

SteamLite es una aplicación web desarrollada con React y Vite, inspirada en las plataformas digitales de distribución de videojuegos.

Permite explorar un catálogo de juegos, consultar sus características, realizar compras simuladas y disfrutar de minijuegos interactivos desde el navegador.

## 🚀 Funcionalidades

- Catálogo dinámico de videojuegos.
- Búsqueda por nombre y filtros por género.
- Página de detalles de cada videojuego.
- Carrito de compras con cálculo de precios.
- Formulario de pago simulado con Formik y Yup.
- Validación de datos ingresados.
- Biblioteca personal de videojuegos adquiridos.
- Persistencia de información mediante localStorage.
- Interfaz moderna y adaptable a diferentes pantallas.
- Tres videojuegos interactivos desarrollados en JavaScript.

## 🕹️ Videojuegos disponibles

### 1. Snake Classic
Controla una serpiente, recoge alimentos, aumenta tu puntuación y evita las colisiones.

### 2. Tres en Raya
Juego de estrategia para dos jugadores. Gana quien consiga alinear tres símbolos.

### 3. Memory Challenge
Encuentra parejas de cartas y completa el desafío utilizando tu memoria.

## 🛠️ Tecnologías utilizadas

- React
- JavaScript
- Vite
- HTML5
- CSS3
- React Router DOM
- React Context API
- Formik
- Yup
- Lucide React
- localStorage
- Git y GitHub

## 📁 Estructura del proyecto

```text
SteamLite/
├── public/
│   ├── images/
│   └── games.json
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── games/
│   ├── hooks/
│   ├── pages/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── README.md
└── vite.config.js
```

## 💻 Instalación y ejecución

### Requisitos

- Node.js
- npm
- Visual Studio Code o un editor compatible

### 1. Clonar el repositorio

```bash
git clone https://github.com/MiguelOP-02/SteamLite.git
```

### 2. Ingresar al proyecto

```bash
cd SteamLite
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar la aplicación

```bash
npm run dev
```

Abrir en el navegador la dirección local indicada por Vite, normalmente:

http://localhost:5173/

## 💳 Compras simuladas

SteamLite permite simular la compra de videojuegos mediante un formulario validado con Formik y Yup.

No se procesan pagos reales ni se realizan transacciones bancarias.

Los videojuegos adquiridos se registran en la biblioteca del usuario mediante localStorage.

## 📋 Gestión del proyecto

El desarrollo se documenta utilizando:

- Repositorio GitHub.
- Issues para registrar funcionalidades.
- GitHub Projects para organizar tareas.
- Ramas para implementar mejoras.
- Pull Requests para revisar e integrar cambios.

## 🎓 Objetivo académico

Aplicar conceptos de desarrollo web con React, gestión de estados, navegación, validación de formularios, almacenamiento local y control de versiones.

## 👨‍💻 Autor

Proyecto académico SteamLite.

## 📄 Licencia

Proyecto desarrollado con fines educativos.
