🚀 GourmetGo
SPA para búsqueda de recetas por ingrediente, con consumo de API (TheMealDB), renderizado dinámico sin recarga y mejoras UX como animaciones y skeleton loaders.

## Descripción

GourmetGo es una Single Page Application (SPA) que permite al usuario buscar recetas de cocinas del mundo escribiendo un ingrediente en español o inglés. La app consulta la API pública TheMealDB sin recargar la página y muestra los resultados en tarjetas con animaciones de entrada, skeleton loaders y scroll automático a los resultados.
El proyecto fue desarrollado en dos sprints:

Sprint 1 Maqueta estática, diseño visual y responsividad con Bootstrap 5
Sprint 2 Conexión a API, async/await, manejo de errores y mejoras de UX

> Buscador de recetas internacionales por ingrediente, con traducción automático español → inglés e integración en tiempo real con TheMealDB.

[![Ver Demo](https://img.shields.io/badge/Ver%20Demo-Online-green?style=for-the-badge)](https://pamebicho.github.io/Gourmet_Go_Buscador_de_Recetas/)

![GourmetGo Hero](/assets/img/gourmet_go_home.png)
![GourmetGo](/assets/img/gourmet_go_recetas.png)

---

## Tecnologías utilizadas

HTML5 semántico Estructura de la página
CSS3 + Variables CSS Diseño, animaciones y tema oscuro
Bootstrap 5.3 Grid, navbar y utilidades responsivas
JavaScript ES2022 Lógica, fetch, clases, AbortController
TheMealDB API Fuente de recetas (pública, sin key)
Google Fonts Cormorant Garamond + DM Sans

---

## Estructura del proyecto

```
Gourmet_Go_Buscador_de_Recetas/
├── index.html          # Página principal
├── assets/
│   ├── css/
│   │   └── style.css   # Estilos personalizados (tema, animaciones, cards)
│   ├── js/
│   │   └── main.js     # Lógica: API, traducción ES→EN, render DOM
│   └── hero.jpg        # Imagen de fondo del hero
└── README.md
```

---

## Instalación y uso

Este proyecto es 100% estático: no requiere Node.js, npm ni ningún servidor de build.

## Opción A — Abrir directamente (más rápido)

```bash
# 1. Clona el repositorio
git clone https://github.com/Pamebicho/Gourmet_Go_Buscador_de_Recetas.git

# 2. Entra a la carpeta
cd Gourmet_Go_Buscador_de_Recetas

# 3. Abre index.html en tu navegador
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

## Opción B — Servidor local (recomendado para evitar restricciones CORS)

Con VS Code + Live Server
Instala la extensión Live Server
Click derecho sobre `index.html` → Open with Live Server
Con Python

```bash
python -m http.server 3000
# Abre http://localhost:3000 en tu navegador
```

Con Node.js

```bash
npx serve .
# Abre la URL que te indica la terminal
```

## Cómo usar el buscador

Escribe un ingrediente en el campo de búsqueda (español o inglés)
Ejemplos: `pollo`, `salmon`, `chocolate`, `pasta`
Usa el autocompletado para ver sugerencias de TheMealDB
Presiona Buscar — la página hace scroll automático a los resultados
Haz click en Ver receta para abrir la receta completa en TheMealDB

---

## Funcionalidades destacadas

Traducción ES → EN automática para más de 50 ingredientes comunes
Skeleton loaders mientras se cargan los resultados
AbortController — cancela fetches anteriores si el usuario busca rápido
Scroll automático a resultados tras una búsqueda exitosa
Sanitización de HTML dinámico para prevenir XSS
Navbar adaptativa — transparente en el hero, sólida al hacer scroll
Diseño responsive (mobile-first) con Bootstrap grid

---

## Historias de usuario implementadas

HU-01 Interfaz principal con formulario de búsqueda visible 1
HU-02 Galería de recetas con tarjetas (cards) 1
HU-03 Diseño responsivo mobile-first 1
HU-04 Búsqueda sin recarga de página (preventDefault) 2
HU-05 Renderizado dinámico de resultados en el DOM 2
HU-06 Mensaje de error cuando no hay resultados 2

---

## API utilizada

TheMealDB — API pública gratuita de recetas.

`filter.php?i={ingrediente}` Lista recetas por ingrediente
`list.php?i=list` Lista todos los ingredientes (para autocompletado)
No requiere API key. Documentación: themealdb.com/api.php

---

## Autor

Pamela Gutierrez M
