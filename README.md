# JavaScriptLab AI — Bloques 1 y 2

Plataforma práctica para estudiar JavaScript a profundidad, sin frameworks como atajo.

## Incluye

### Bloque 1 — Banco de trabajo JS
- Entorno de desarrollo
- DevTools y consola
- Strict mode
- Node + npm
- package.json y semver
- Servidor local
- ESLint y Prettier
- Playgrounds

### Bloque 2 — Strings + RegExp
- 15 recetas prácticas basadas en el capítulo 2 del JavaScript Cookbook (3ª edición)
- 75 drills
- 15 retos ejecutables con validación automática
- String Inspector para observar length, trim, code points y escapes
- Regex Arena para probar patrones, flags, coincidencias e índices
- Proyecto integrador TextForge JS

## Filosofía

La plataforma transforma el material fuente en práctica original:

**concepto → predicción → drill → código → error → depuración → reto → proyecto**

No reproduce el libro como texto de lectura. Lo usa como mapa técnico y convierte cada receta en ejercicios.

## Ejecutar

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

El progreso se guarda en `localStorage`. La versión de Bloque 2 migra automáticamente el progreso existente del Bloque 1 cuando encuentra la clave anterior.
