import { lessons as block1Lessons, integrator as block1Integrator } from './block1';
import { lessons as block2Lessons, integrator as block2Integrator } from './block2';

export const roadmap = [
  { id: 'b1', title: 'Banco de trabajo JS', subtitle: 'Entorno, consola, npm y calidad', unlocked: true },
  { id: 'b2', title: 'Strings + RegExp', subtitle: 'Texto, Unicode, búsqueda y patrones', unlocked: true },
  { id: 'b3', title: 'Numbers + Dates', subtitle: 'Precisión, formatos y tiempo', unlocked: false },
  { id: 'b4', title: 'Arrays a profundidad', subtitle: 'Transformar, buscar y reducir', unlocked: false },
  { id: 'b5', title: 'Funciones', subtitle: 'Closures, binding, recursión', unlocked: false },
  { id: 'b6', title: 'Objetos + Classes', subtitle: 'Prototipos, Proxy y módulos', unlocked: false },
  { id: 'b7', title: 'Async JavaScript', subtitle: 'Promises, async/await y workers', unlocked: false },
  { id: 'b8', title: 'Errores + Testing', subtitle: 'Fallos, pruebas y cobertura', unlocked: false },
  { id: 'b9', title: 'Browser Engineering', subtitle: 'DOM, DevTools, rendimiento', unlocked: false },
  { id: 'b10', title: 'Datos remotos', subtitle: 'Fetch, WebSockets y persistencia', unlocked: false },
  { id: 'b11', title: 'Web Apps', subtitle: 'PWA, archivos y Web Components', unlocked: false },
  { id: 'b12', title: 'Node.js', subtitle: 'Runtime, módulos y CLI', unlocked: false },
  { id: 'b13', title: 'Express + APIs', subtitle: 'REST, GraphQL y autenticación', unlocked: false },
  { id: 'b14', title: 'JS Internals', subtitle: 'Event loop, V8, AST y GC', unlocked: false },
  { id: 'b15', title: 'Work Simulator', subtitle: 'Tickets y sistemas rotos', unlocked: false },
];

export const blocks = {
  b1: {
    id: 'b1',
    number: '01',
    shortTitle: 'Banco de trabajo',
    eyebrow: 'BLOQUE 01 · EL BANCO DE TRABAJO',
    heroTitle: 'JavaScript se aprende',
    heroEmphasis: 'tocando código.',
    description: 'Convierte el capítulo de entorno del cookbook en una pista práctica: consola, tooling, errores intencionales, terminal, linting y pequeños retos ejecutables.',
    visualMark: 'JS',
    visualCards: ['terminal', 'debug', 'build'],
    lessons: block1Lessons,
    integrator: block1Integrator,
    sourceLabel: 'Capítulo 1 · Setting Up a Development Environment'
  },
  b2: {
    id: 'b2',
    number: '02',
    shortTitle: 'Strings + RegExp',
    eyebrow: 'BLOQUE 02 · STRINGS + REGEXP',
    heroTitle: 'Texto que parece simple,',
    heroEmphasis: 'hasta que deja de serlo.',
    description: 'Quince recetas convertidas en práctica: validación, Unicode, templates, locale, búsqueda, parsing, limpieza y expresiones regulares con laboratorios interactivos.',
    visualMark: '/.*/',
    visualCards: ['strings', 'unicode', 'regex'],
    lessons: block2Lessons,
    integrator: block2Integrator,
    sourceLabel: 'Capítulo 2 · Strings and Regular Expressions'
  }
};

export const unlockedBlocks = roadmap.filter((item) => item.unlocked).map((item) => blocks[item.id]);
