export const roadmap = [
  { id: 'b1', title: 'Banco de trabajo JS', subtitle: 'Entorno, consola, npm y calidad', unlocked: true },
  { id: 'b2', title: 'Strings + RegExp', subtitle: 'Texto, validación y patrones', unlocked: false },
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

const makeDrills = (...items) => items.map((text, i) => ({ id: `d${i + 1}`, text }));

export const lessons = [
  {
    id: 'workbench',
    order: '01',
    title: 'Construye tu banco de trabajo',
    tag: 'Setup',
    time: '25 min',
    difficulty: 'Base',
    summary: 'Prepara un proyecto como desarrollador: carpeta, editor, archivos y una rutina de trabajo repetible.',
    concept: 'El cookbook abre con el entorno de desarrollo y propone empezar por un editor que entienda JavaScript, una carpeta de proyecto y herramientas que crecen contigo.',
    takeaways: [
      'Separar cada proyecto en su propia carpeta.',
      'Reconocer autocompletado, syntax highlighting, terminal y depuración como parte del entorno.',
      'Usar una estructura mínima index.html + app.js para experimentar.'
    ],
    drills: makeDrills(
      'Crea una carpeta js-lab-01 y ábrela como proyecto completo, no como archivo suelto.',
      'Crea index.html, app.js y notes.md. Explica para qué usarías cada archivo.',
      'Encuentra en tu editor el panel de terminal y ejecuta un comando desde la carpeta del proyecto.'
    ),
    challenge: 'Haz que la página cargue app.js y escriba un mensaje de arranque en la consola.',
    starterCode: `// app.js\nconst projectName = 'JavaScriptLab';\n\n// TODO: imprime \"JavaScriptLab listo\" usando projectName\n`,
    validator: ({ output }) => /JavaScriptLab listo/i.test(output),
    hint: 'Usa console.log() y una template literal o concatenación.'
  },
  {
    id: 'console',
    order: '02',
    title: 'La consola es tu laboratorio',
    tag: 'DevTools',
    time: '30 min',
    difficulty: 'Base',
    summary: 'Aprende a usar la consola para observar el programa, detectar fallos y probar ideas sin reconstruir una página completa.',
    concept: 'El cookbook usa la consola del navegador como instrumento de diagnóstico: muestra mensajes de tu código y errores no controlados, y conecta el error con la línea que lo provocó.',
    takeaways: [
      'Distinguir salida normal, advertencias y errores.',
      'Leer un SyntaxError o ReferenceError como pista, no como fracaso.',
      'Usar DevTools como parte de la ejecución diaria.'
    ],
    drills: makeDrills(
      'Abre DevTools y ejecuta 5 expresiones diferentes directamente en Console.',
      'Provoca a propósito un SyntaxError y localiza la línea señalada.',
      'Provoca un ReferenceError, corrígelo y vuelve a ejecutar el mismo fragmento.'
    ),
    challenge: 'Clasifica tres mensajes con log, warn y error y deja una salida legible.',
    starterCode: `console.log('Servidor iniciado');\n// TODO: crea una advertencia para memoria alta\n// TODO: crea un error para conexión fallida\n`,
    validator: ({ output }) => /Servidor iniciado/i.test(output) && /memoria/i.test(output) && /conexi[oó]n/i.test(output),
    hint: 'El runner captura console.log(), console.warn() y console.error().'
  },
  {
    id: 'console-power',
    order: '03',
    title: 'Console power tools',
    tag: 'Debug',
    time: '35 min',
    difficulty: 'Base+',
    summary: 'Deja de usar la consola como una impresora de texto y úsala para contar, agrupar, medir y rastrear.',
    concept: 'El capítulo presenta herramientas como assert, trace, count, dir, group y time/timeEnd para inspección más precisa.',
    takeaways: [
      'Medir una operación con un temporizador etiquetado.',
      'Contar cuántas veces ocurre una rama.',
      'Agrupar mensajes relacionados para leer mejor una sesión de depuración.'
    ],
    drills: makeDrills(
      'Mide con console.time cuánto tarda un ciclo con 100,000 iteraciones.',
      'Usa console.count dentro de una función que llames cinco veces.',
      'Crea un console.assert que falle cuando un carrito tenga total negativo.'
    ),
    challenge: 'Instrumenta una función sin cambiar su resultado: cuenta llamadas y registra inicio/fin.',
    starterCode: `function calculateTotal(items) {\n  // TODO: cuenta cuántas veces se invoca\n  const total = items.reduce((sum, item) => sum + item, 0);\n  // TODO: muestra el total\n  return total;\n}\n\ncalculateTotal([20, 30, 50]);\ncalculateTotal([5, 10]);\n`,
    validator: ({ output }) => /100/.test(output) && /15/.test(output),
    hint: 'No necesitas modificar el cálculo: agrega instrumentación alrededor.'
  },
  {
    id: 'snippets-scope',
    order: '04',
    title: 'Experimenta sin ensuciar el scope',
    tag: 'Console',
    time: '25 min',
    difficulty: 'Base+',
    summary: 'Prueba bloques repetidamente y comprende por qué redeclarar const o let en el mismo scope puede fallar.',
    concept: 'El cookbook propone envolver un experimento en llaves para crear un scope de bloque nuevo cuando necesitas repetirlo en la consola.',
    takeaways: [
      'Reconocer el error de redeclaración.',
      'Aislar experimentos en un bloque.',
      'Usar historial de consola para iterar sobre una idea.'
    ],
    drills: makeDrills(
      'Declara una const en Console e intenta declararla de nuevo con el mismo nombre.',
      'Repite el experimento dentro de { ... } y observa la diferencia.',
      'Convierte tres pruebas sueltas en pequeños bloques reproducibles.'
    ),
    challenge: 'Aísla dos cálculos que usan el mismo nombre local sin que colisionen.',
    starterCode: `{\n  const value = 10;\n  console.log(value * 2);\n}\n\n// TODO: crea otro bloque que declare otra const value = 7\n// y muestre value * 3\n`,
    validator: ({ output }) => /20/.test(output) && /21/.test(output),
    hint: 'Las llaves solas pueden crear un block scope.'
  },
  {
    id: 'strict',
    order: '05',
    title: 'Haz que JavaScript te avise',
    tag: 'Quality',
    time: '35 min',
    difficulty: 'Intermedio',
    summary: 'Comprende strict mode como una red temprana contra errores silenciosos y hábitos ambiguos.',
    concept: 'El cookbook muestra cómo un error de capitalización puede crear una variable inesperada y cómo strict mode convierte ciertos fallos silenciosos en errores visibles.',
    takeaways: [
      'Detectar asignaciones a nombres no declarados.',
      'Entender que los módulos de JavaScript trabajan en strict mode.',
      'Valorar los errores tempranos como protección.'
    ],
    drills: makeDrills(
      'Activa strict mode en un archivo clásico y asigna un valor a una variable no declarada.',
      'Corrige el error declarando la variable con let o const.',
      'Explica por qué un error visible es mejor que un resultado silenciosamente incorrecto.'
    ),
    challenge: 'Encuentra y corrige el typo que hace que el segundo cálculo sea incorrecto.',
    starterCode: `'use strict';\nlet startNumber = 10;\nlet endNumber = 15;\n\nfunction addRange(start, end) {\n  let sum = 0;\n  for (let i = start; i <= end; i++) sum += i;\n  return sum;\n}\n\nconsole.log(addRange(startNumber, endNumber));\n\n// BUG: corrige esta línea\nstartnumber = 1;\nendNumber = 5;\nconsole.log(addRange(startNumber, endNumber));\n`,
    validator: ({ output, error }) => !error && /75/.test(output) && /15/.test(output),
    hint: 'JavaScript distingue mayúsculas y minúsculas.'
  },
  {
    id: 'emmet',
    order: '06',
    title: 'Boilerplate a velocidad de teclado',
    tag: 'Workflow',
    time: '20 min',
    difficulty: 'Base',
    summary: 'Usa abreviaturas para dedicar menos energía al markup repetitivo y más a la lógica.',
    concept: 'El cookbook introduce Emmet como una manera de expandir abreviaturas en estructuras HTML comunes desde editores compatibles.',
    takeaways: [
      'Generar un documento HTML base rápidamente.',
      'Crear estructuras repetidas con multiplicadores.',
      'Entender que una herramienta de productividad no sustituye conocer HTML.'
    ],
    drills: makeDrills(
      'En un .html, prueba html:5 o el atajo equivalente de tu editor.',
      'Genera una lista con cinco li usando una sola abreviatura.',
      'Crea una estructura header>nav+main+footer sin copiar y pegar.'
    ),
    challenge: 'Escribe una abreviatura conceptual para una lista de 5 elementos y registra su forma.',
    starterCode: `const emmetIdea = 'ul>li*5';\nconsole.log(emmetIdea);\n// TODO: imprime también una abreviatura para header + main + footer\n`,
    validator: ({ output }) => /ul>li\*5/.test(output) && /header/i.test(output) && /main/i.test(output) && /footer/i.test(output),
    hint: 'No estamos expandiendo Emmet en el runner; estamos entrenando la sintaxis mental.'
  },
  {
    id: 'npm',
    order: '07',
    title: 'Node + npm sin magia',
    tag: 'Tooling',
    time: '40 min',
    difficulty: 'Base+',
    summary: 'Entiende qué papel juegan Node y npm aunque todavía estés escribiendo JavaScript para el navegador.',
    concept: 'El cookbook explica que npm llega con Node y que el gestor de paquetes no solo descarga librerías: registra dependencias, versiones y tareas del proyecto.',
    takeaways: [
      'Distinguir runtime (Node) de package manager (npm).',
      'Comprobar instalaciones con comandos de versión.',
      'Reconocer una dependencia frente a una dependencia de desarrollo.'
    ],
    drills: makeDrills(
      'Ejecuta node -v y npm -v en tu terminal.',
      'Inicializa un proyecto de práctica con npm init -y.',
      'Abre package.json y localiza name, version y scripts.'
    ),
    terminal: true,
    terminalTasks: ['node -v', 'npm -v', 'npm init -y'],
    challenge: 'Completa la secuencia de comandos para verificar herramientas e inicializar un proyecto.',
    starterCode: `// Usa el simulador de terminal de esta lección.\nconsole.log('Después vuelve aquí y marca los drills como completados.');`,
    validator: ({ output }) => /simulador/i.test(output),
    hint: 'La práctica principal de esta receta está en el terminal simulado.'
  },
  {
    id: 'package-json',
    order: '08',
    title: 'package.json, lockfile y semver',
    tag: 'Dependencies',
    time: '45 min',
    difficulty: 'Intermedio',
    summary: 'Aprende a leer el contrato de dependencias de un proyecto y a actualizar sin tratar las versiones como números al azar.',
    concept: 'El cookbook diferencia package.json de package-lock.json y explica la lógica de versionado semántico para actualizaciones patch, minor y major.',
    takeaways: [
      'package.json declara intención; el lockfile fija un árbol concreto de versiones.',
      'Separar cambios patch, minor y major.',
      'Revisar dependencias desactualizadas antes de actualizar.'
    ],
    drills: makeDrills(
      'Interpreta qué cambio representa pasar de 2.1.2 a 2.1.3.',
      'Interpreta qué cambio representa pasar de 2.1.2 a 2.2.0.',
      'Explica por qué 2.x a 3.x merece revisión explícita.'
    ),
    terminal: true,
    terminalTasks: ['npm outdated', 'npm update'],
    challenge: 'Clasifica versiones y deja una salida que identifique patch, minor y major.',
    starterCode: `function classify(from, to) {\n  // TODO: devuelve 'patch', 'minor' o 'major' comparando x.y.z\n}\n\nconsole.log(classify('2.1.2', '2.1.3'));\nconsole.log(classify('2.1.2', '2.2.0'));\nconsole.log(classify('2.1.2', '3.0.0'));\n`,
    validator: ({ output }) => /patch/.test(output) && /minor/.test(output) && /major/.test(output),
    hint: 'Convierte cada versión en tres números y compara primero major, luego minor.'
  },
  {
    id: 'server',
    order: '09',
    title: 'No trabajes desde file://',
    tag: 'Local server',
    time: '40 min',
    difficulty: 'Intermedio',
    summary: 'Comprende por qué un servidor de desarrollo elimina restricciones del filesystem y reproduce mejor el contexto web real.',
    concept: 'El cookbook recomienda un servidor local para evitar restricciones del navegador al abrir archivos directamente y muestra un flujo con servidor de desarrollo y recarga automática.',
    takeaways: [
      'Distinguir file:, localhost y servidor remoto.',
      'Entender por qué algunas APIs requieren un origen web.',
      'Convertir una tarea repetitiva en un script de desarrollo.'
    ],
    drills: makeDrills(
      'Abre una página como archivo local y revisa location.protocol.',
      'Sírvela desde un servidor local y vuelve a revisar protocol y host.',
      'Crea mentalmente un script dev que arranque tu servidor.'
    ),
    terminal: true,
    terminalTasks: ['npm run dev'],
    challenge: 'Escribe una función que detecte si la app está en archivo local, localhost o remoto.',
    starterCode: `function environment(protocol, host) {\n  // TODO\n}\n\nconsole.log(environment('file:', ''));\nconsole.log(environment('http:', 'localhost:5173'));\nconsole.log(environment('https:', 'ejemplo.com'));\n`,
    validator: ({ output }) => /local file|archivo/i.test(output) && /local server|localhost/i.test(output) && /remote|remoto/i.test(output),
    hint: 'Primero revisa protocol; después revisa si host empieza con localhost.'
  },
  {
    id: 'eslint',
    order: '10',
    title: 'Tu código necesita un segundo par de ojos',
    tag: 'Linting',
    time: '50 min',
    difficulty: 'Intermedio',
    summary: 'Separa “el código corre” de “el código es razonable” usando análisis estático.',
    concept: 'El cookbook presenta ESLint como un linter que aplica reglas para detectar errores potenciales, prácticas sospechosas y convenciones acordadas.',
    takeaways: [
      'Distinguir error de sintaxis de advertencia de calidad.',
      'No desactivar reglas de forma global por comodidad.',
      'Usar linting como feedback temprano antes de ejecutar.'
    ],
    drills: makeDrills(
      'Crea una variable sin usar y observa cómo la reporta tu configuración de lint.',
      'Crea un switch con una caída accidental entre casos y analiza el aviso.',
      'Corrige el problema en lugar de silenciar la regla.'
    ),
    challenge: 'Refactoriza un fragmento para eliminar una variable innecesaria sin cambiar el resultado.',
    starterCode: `function greet(name) {\n  const unusedMessage = 'hola';\n  return 'Hola, ' + name;\n}\n\nconsole.log(greet('Ada'));\n// TODO: elimina lo innecesario y conserva la salida.\n`,
    validator: ({ output, code }) => /Hola, Ada/.test(output) && !/unusedMessage/.test(code),
    hint: 'No toda declaración aporta valor al programa.'
  },
  {
    id: 'prettier',
    order: '11',
    title: 'Automatiza el estilo, conserva tu atención',
    tag: 'Formatting',
    time: '35 min',
    difficulty: 'Intermedio',
    summary: 'Entiende por qué formatear automáticamente evita discusiones y reduce ruido visual sin reemplazar al linter.',
    concept: 'El cookbook trata Prettier como formateador automático y lo diferencia del linter: el formateador normaliza presentación; el linter busca patrones problemáticos.',
    takeaways: [
      'Separar estilo automático de reglas de calidad.',
      'Valorar una representación consistente del mismo código.',
      'Evitar reglas duplicadas o conflictivas entre herramientas.'
    ],
    drills: makeDrills(
      'Toma un fragmento mal indentado y aplícale format document.',
      'Activa format on save en un proyecto de prueba.',
      'Explica qué debería resolver el formatter y qué debería seguir resolviendo el linter.'
    ),
    challenge: 'Limpia manualmente el fragmento y deja la misma salida.',
    starterCode: `const   user={name:'Ada',skills:['JS','Web']};\nfunction show( value ){console.log(value)}\nshow( user.name );\n// TODO: reformatea sin cambiar el comportamiento.\n`,
    validator: ({ output }) => /Ada/.test(output),
    hint: 'La meta aquí es legibilidad; la salida debe seguir siendo Ada.'
  },
  {
    id: 'playground',
    order: '12',
    title: 'Playground: prueba antes de construir',
    tag: 'Experiment',
    time: '30 min',
    difficulty: 'Base+',
    summary: 'Aprende cuándo conviene un experimento desechable y cuándo ya necesitas un proyecto real.',
    concept: 'El cookbook cierra el capítulo con playgrounds: entornos web para editar y ejecutar HTML/CSS/JS rápidamente, previsualizar y compartir experimentos.',
    takeaways: [
      'Usar playgrounds para validar ideas pequeñas.',
      'No confundir un snippet compartible con una arquitectura de proyecto.',
      'Pasar a un proyecto local cuando necesitas archivos, tooling o backend.'
    ],
    drills: makeDrills(
      'Construye un botón que incremente un contador en un playground.',
      'Reproduce el mismo experimento en tu proyecto local.',
      'Escribe tres criterios que te harían abandonar el playground y crear un proyecto.'
    ),
    challenge: 'Implementa un contador mínimo como cierre del bloque.',
    starterCode: `let count = 0;\n\nfunction increment() {\n  // TODO: incrementa count y devuelve el valor nuevo\n}\n\nconsole.log(increment());\nconsole.log(increment());\nconsole.log(increment());\n`,
    validator: ({ output }) => /1/.test(output) && /2/.test(output) && /3/.test(output),
    hint: 'Actualiza count antes de devolverlo.'
  },
];

export const integrator = {
  title: 'Proyecto integrador — JS Workbench Check',
  description: 'Deja un proyecto pequeño listo para trabajar: estructura, consola útil, strict mode o módulos, script de desarrollo, linting, formato y una evidencia de que entiendes qué hace cada pieza.',
  deliverables: [
    'index.html + app.js funcionando desde un servidor local.',
    'package.json con un script dev.',
    'Un error intencional reproducido y documentado en DevTools.',
    'Código corregido y revisado por linter.',
    'Formato consistente y una nota breve explicando linter vs formatter.',
    'README con los comandos mínimos para levantar el proyecto.'
  ]
};
