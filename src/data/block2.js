const makeDrills = (...items) => items.map((text, i) => ({ id: `d${i + 1}`, text }));

export const lessons = [
  {
    id: 'b2-string-safety',
    order: '2.1',
    title: 'Valida texto antes de usarlo',
    tag: 'Strings',
    time: '40 min',
    difficulty: 'Base+',
    summary: 'Distingue una cadena real, una cadena vacía y un valor compuesto solo por espacios antes de procesarlo.',
    concept: 'La receta parte de tres comprobaciones distintas: tipo string, longitud mayor que cero y contenido útil después de trim(). También aprovecha el short-circuit de && para evitar operaciones inseguras sobre tipos inesperados.',
    takeaways: [
      'Usar typeof para distinguir strings primitivas de otros valores.',
      'Combinar validaciones de forma segura con evaluación de cortocircuito.',
      'Usar trim() cuando los espacios no deben contar como contenido.'
    ],
    drills: makeDrills(
      'Prueba la validación con "hola", "", "   ", 0, null y undefined.',
      'Explica por qué revisar .length antes de comprobar el tipo puede fallar.',
      'Construye una función isUsefulString(value) que solo acepte texto no vacío.',
      'Compara el comportamiento de if (value) frente a una validación explícita.',
      'Crea una tabla de entradas y salidas esperadas antes de escribir el código.'
    ),
    challenge: 'Implementa isUsefulString() y demuestra que acepta texto real y rechaza vacío, espacios y valores no string.',
    starterCode: `function isUsefulString(value) {\n  // TODO: debe ser string y conservar contenido después de trim()\n}\n\nconsole.log(isUsefulString('JavaScript'));\nconsole.log(isUsefulString('   '));\nconsole.log(isUsefulString(''));\nconsole.log(isUsefulString(42));\n`,
    validator: ({ output, error }) => !error && /^true\s+false\s+false\s+false$/m.test(output.replace(/\r/g, '')),
    hint: `Combina typeof value === 'string' con value.trim().length > 0.`,
    widget: 'string',
    inspectorText: '   JavaScriptLab   '
  },
  {
    id: 'b2-number-format',
    order: '2.2',
    title: 'Convierte números en texto útil',
    tag: 'Formatting',
    time: '50 min',
    difficulty: 'Intermedio',
    summary: 'Pasa de un número crudo a representaciones legibles con toString(), toFixed(), toPrecision(), toExponential() e Intl.NumberFormat.',
    concept: 'El capítulo contrasta la conversión implícita con conversiones explícitas y después introduce formatos numéricos específicos y formatos sensibles a locale mediante Intl.NumberFormat.',
    takeaways: [
      'Preferir conversiones explícitas cuando la intención importa.',
      'Distinguir decimales fijos, dígitos significativos y notación científica.',
      'Reutilizar Intl.NumberFormat para moneda y reglas locales.'
    ],
    drills: makeDrills(
      'Convierte 42 a string con toString() y confirma typeof del resultado.',
      'Formatea 1242.0055 con dos decimales y observa el redondeo.',
      'Compara toFixed(2), toPrecision(5) y toExponential(2).',
      'Crea un formatter es-MX para MXN y úsalo con tres cantidades.',
      'Explica por qué reutilizar un formatter es mejor que recrearlo en un ciclo largo.'
    ),
    challenge: 'Crea formatPriceMXN(value) para devolver una cantidad monetaria mexicana con dos decimales.',
    starterCode: `const mxn = new Intl.NumberFormat('es-MX', {\n  style: 'currency',\n  currency: 'MXN',\n  minimumFractionDigits: 2\n});\n\nfunction formatPriceMXN(value) {\n  // TODO\n}\n\nconsole.log(formatPriceMXN(1234.5));\nconsole.log(formatPriceMXN(99));\n`,
    validator: ({ output, error }) => !error && /1[,.]234/.test(output) && /99/.test(output) && /\$|MXN/.test(output),
    hint: 'El objeto Intl.NumberFormat ya tiene un método format(value).'
  },
  {
    id: 'b2-escape-sequences',
    order: '2.3',
    title: 'Controla caracteres especiales',
    tag: 'Unicode',
    time: '35 min',
    difficulty: 'Base+',
    summary: 'Domina saltos de línea, tabulaciones, comillas, backslashes y escapes Unicode sin romper tus literales.',
    concept: 'Las secuencias de escape comienzan con backslash y permiten representar caracteres que tendrían significado sintáctico o que son difíciles de escribir directamente.',
    takeaways: [
      'Usar \\n y \\t cuando realmente necesitas control explícito del texto.',
      'Escapar la misma comilla usada como delimitador.',
      'Reconocer escapes Unicode de cuatro dígitos.'
    ],
    drills: makeDrills(
      'Construye una cadena de tres líneas usando \\n.',
      'Imprime una ruta de Windows que conserve los backslashes.',
      'Incluye comillas simples dentro de una cadena delimitada por comillas simples.',
      'Inserta el símbolo © mediante un escape Unicode.',
      'Reescribe uno de los ejercicios usando template literals y compara legibilidad.'
    ),
    challenge: 'Construye una ficha multilínea con nombre, ruta y símbolo de copyright usando escapes correctamente.',
    starterCode: `const name = 'Ada';\nconst path = 'C:\\\\labs\\\\javascript';\n// TODO: crea profile con salto de línea, tabulación y © mediante \\u00A9\n\nconsole.log(profile);\n`,
    validator: ({ output, error }) => !error && /Ada/.test(output) && /labs/.test(output) && /©/.test(output),
    hint: `Puedes construir algo como "Nombre: ...\\n\\tRuta: ...\\n\\u00A9 ...".`
  },
  {
    id: 'b2-emojis',
    order: '2.4',
    title: 'Unicode real: emojis y code points',
    tag: 'Unicode',
    time: '45 min',
    difficulty: 'Intermedio',
    summary: 'Trabaja con caracteres fuera del plano básico y descubre por qué .length no siempre equivale a “cantidad de caracteres visibles”.',
    concept: 'La receta usa String.fromCodePoint() para caracteres Unicode extendidos y muestra una limitación importante: algunos emojis ocupan más de una unidad UTF-16, por lo que length puede sorprenderte.',
    takeaways: [
      'Crear un carácter con String.fromCodePoint().',
      'Distinguir code units de la idea visual de “carácter”.',
      'Probar temprano cadenas con emojis cuando el producto los acepta.'
    ],
    drills: makeDrills(
      'Crea 🍔 con String.fromCodePoint(0x1F354).',
      'Compara "A".length con "🍔".length.',
      'Compara text.length con [...text].length en una cadena con emoji.',
      'Itera una cadena con for...of y observa qué valores obtienes.',
      'Documenta un caso donde cortar una cadena por índices podría romper texto Unicode.'
    ),
    challenge: 'Crea una función codePointLength(text) que cuente code points usando iteración moderna.',
    starterCode: `function codePointLength(text) {\n  // TODO: devuelve el número de code points\n}\n\nconst burger = String.fromCodePoint(0x1F354);\nconsole.log(burger);\nconsole.log(burger.length);\nconsole.log(codePointLength(burger));\n`,
    validator: ({ output, error }) => !error && /🍔/.test(output) && /2/.test(output) && /1/.test(output),
    hint: 'El spread operator sobre una string itera por code points: [...text].length.',
    widget: 'string',
    inspectorText: 'JS 🍔 ⚙️'
  },
  {
    id: 'b2-template-literals',
    order: '2.5',
    title: 'Template literals sin concatenación frágil',
    tag: 'Templates',
    time: '45 min',
    difficulty: 'Base+',
    summary: 'Intercala variables y expresiones en texto legible, conserva saltos de línea y evita cadenas difíciles de mantener.',
    concept: 'Los template literals usan backticks y expresiones ${...}. Las expresiones pueden contener variables, cálculos o llamadas a funciones, siempre cuidando que la plantilla siga siendo fácil de leer.',
    takeaways: [
      'Interpolar valores con ${...}.',
      'Usar expresiones simples dentro de una plantilla.',
      'Preservar saltos de línea directamente en el literal.'
    ],
    drills: makeDrills(
      'Reescribe una concatenación de nombre y apellido con template literal.',
      'Inserta el resultado de 5 + 3 directamente dentro de una plantilla.',
      'Crea una plantilla multilínea para una pequeña factura.',
      'Inserta el resultado de una función formatPrice() dentro de ${...}.',
      'Refactoriza una expresión demasiado compleja sacándola a una variable previa.'
    ),
    challenge: 'Genera una tarjeta de empleado legible con nombre, equipo y antigüedad usando una sola template literal.',
    starterCode: `const firstName = 'Ada';\nconst lastName = 'Lovelace';\nconst team = 'Computación';\nconst years = 3;\n\n// TODO: usa template literal, no concatenación con +\nconst card = '';\nconsole.log(card);\n`,
    validator: ({ output, code, error }) => !error && /Ada Lovelace/.test(output) && /Computaci[oó]n/.test(output) && /3/.test(output) && /`/.test(code) && /\$\{/.test(code),
    hint: 'Usa backticks y coloca cada valor dentro de ${...}.'
  },
  {
    id: 'b2-case-insensitive',
    order: '2.6',
    title: 'Compara texto ignorando mayúsculas',
    tag: 'Locale',
    time: '40 min',
    difficulty: 'Intermedio',
    summary: 'Haz comparaciones case-insensitive simples y conoce localeCompare() cuando el idioma y los acentos importan.',
    concept: 'Para casos sencillos puedes normalizar ambos lados con toLowerCase(). La receta también usa localeCompare() con sensitivity para comparaciones conscientes del locale.',
    takeaways: [
      'Normalizar ambos operandos antes de comparar.',
      'Interpretar 0 en localeCompare() como igualdad.',
      'Distinguir sensitivity accent de base.'
    ],
    drills: makeDrills(
      'Comprueba que "hello" y "HELLO" coinciden después de toLowerCase().',
      'Usa localeCompare() y confirma que devuelve 0 para una coincidencia.',
      'Compara "cafe" y "café" con sensitivity accent.',
      'Repite con sensitivity base y documenta la diferencia.',
      'Crea equalsIgnoreCase(a,b) y úsala en una búsqueda simple.'
    ),
    challenge: 'Implementa equalsIgnoreCase() usando localeCompare() y sensitivity accent.',
    starterCode: `function equalsIgnoreCase(a, b) {\n  // TODO\n}\n\nconsole.log(equalsIgnoreCase('JavaScript', 'JAVASCRIPT'));\nconsole.log(equalsIgnoreCase('cafe', 'café'));\n`,
    validator: ({ output, error }) => !error && /^true\s+false$/m.test(output.replace(/\r/g, '')),
    hint: `a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0`
  },
  {
    id: 'b2-includes',
    order: '2.7',
    title: 'Busca una subcadena con intención',
    tag: 'Search',
    time: '35 min',
    difficulty: 'Base+',
    summary: 'Usa includes() para preguntas sí/no, controla desde qué posición buscar y decide cuándo necesitas indexOf() en su lugar.',
    concept: 'includes() responde si una subcadena está presente y puede recibir una posición inicial. La búsqueda es case-sensitive salvo que normalices ambos textos.',
    takeaways: [
      'Usar includes() para presencia, no para obtener posición.',
      'Pasar un índice inicial cuando quieres saltarte coincidencias tempranas.',
      'Normalizar case cuando la experiencia de búsqueda lo requiere.'
    ],
    drills: makeDrills(
      'Busca "JavaScript" dentro de una frase y registra true/false.',
      'Prueba la misma búsqueda cambiando mayúsculas para observar sensibilidad.',
      'Haz una búsqueda case-insensitive normalizando ambos lados.',
      'Busca desde una posición posterior para ignorar la primera coincidencia.',
      'Decide cuándo migrarías de includes() a indexOf() o matchAll().' 
    ),
    challenge: 'Implementa containsIgnoreCase(fullText, needle) sin modificar los argumentos originales.',
    starterCode: `function containsIgnoreCase(fullText, needle) {\n  // TODO\n}\n\nconsole.log(containsIgnoreCase('Aprender JavaScript practicando', 'JAVASCRIPT'));\nconsole.log(containsIgnoreCase('Aprender JavaScript practicando', 'Python'));\n`,
    validator: ({ output, error }) => !error && /^true\s+false$/m.test(output.replace(/\r/g, '')),
    hint: 'Convierte copias de ambos strings a minúsculas y usa includes().',
    widget: 'string',
    inspectorText: 'Aprender JavaScript practicando'
  },
  {
    id: 'b2-replace-all',
    order: '2.8',
    title: 'Reemplaza todas las coincidencias exactas',
    tag: 'Transform',
    time: '35 min',
    difficulty: 'Base+',
    summary: 'Transforma texto completo con replaceAll() y entiende que las strings originales no se modifican.',
    concept: 'replaceAll() recibe el texto a buscar y el reemplazo, y devuelve una nueva cadena donde todas las coincidencias exactas fueron sustituidas.',
    takeaways: [
      'Reemplazar todas las coincidencias exactas en una llamada.',
      'Recordar que las strings son inmutables.',
      'Reservar regex para patrones, no para toda sustitución sencilla.'
    ],
    drills: makeDrills(
      'Sustituye todas las apariciones de "error" por "warning".',
      'Comprueba que la variable original sigue intacta.',
      'Prueba replace() y replaceAll() con una frase que repite la palabra tres veces.',
      'Encadena dos replaceAll() y evalúa si sigue siendo legible.',
      'Diseña una función renameToken(text, oldName, newName).' 
    ),
    challenge: 'Implementa sanitizeLabel() para cambiar espacios por guiones y eliminar una palabra prohibida repetida.',
    starterCode: `function sanitizeLabel(text) {\n  // TODO: cambia todos los espacios por '-' y todas las apariciones de 'beta' por 'stable'\n}\n\nconsole.log(sanitizeLabel('app beta beta release'));\n`,
    validator: ({ output, error }) => !error && /app-stable-stable-release/.test(output),
    hint: 'Puedes encadenar dos llamadas a replaceAll().'
  },
  {
    id: 'b2-html-escape',
    order: '2.9',
    title: 'Texto vs HTML: no confundas contenido con markup',
    tag: 'Security',
    time: '50 min',
    difficulty: 'Intermedio',
    summary: 'Practica el escape de angle brackets y adopta la regla conceptual de preferir textContent cuando el dato es texto.',
    concept: 'La receta muestra cómo convertir < y > en entidades para que se muestren como texto. También remarca que, cuando no necesitas mezclar markup, textContent evita interpretar la entrada como HTML.',
    takeaways: [
      'Escapar caracteres con entidades cuando generas texto que contiene markup visible.',
      'Distinguir contenido de usuario de HTML confiable.',
      'Preferir APIs que tratan el valor como texto cuando sea posible.'
    ],
    drills: makeDrills(
      'Convierte <p>Hola</p> en una representación visible con &lt; y &gt;.',
      'Encadena reemplazos para <, > y &.',
      'Explica por qué el orden de escape puede importar si incluyes ampersand.',
      'Escribe un ejemplo conceptual con textContent y otro con innerHTML.',
      'Revisa un fragmento de tu propio código y clasifica qué valores son texto y cuáles son markup.'
    ),
    challenge: 'Crea escapeAngles(text) que convierta < y > en entidades sin tocar el resto del contenido.',
    starterCode: `function escapeAngles(text) {\n  // TODO\n}\n\nconsole.log(escapeAngles('<p>Hola <strong>JS</strong></p>'));\n`,
    validator: ({ output, error }) => !error && /&lt;p&gt;Hola &lt;strong&gt;JS&lt;\/strong&gt;&lt;\/p&gt;/.test(output),
    hint: `Encadena replaceAll('<', '&lt;') y replaceAll('>', '&gt;').`
  },
  {
    id: 'b2-regex-replace',
    order: '2.10',
    title: 'Reemplaza patrones con RegExp',
    tag: 'RegExp',
    time: '70 min',
    difficulty: 'Intermedio+',
    summary: 'Da el salto de coincidencias exactas a patrones: literales regex, bandera global, cuantificadores y construcción dinámica.',
    concept: 'La receta introduce expresiones regulares como patrones de texto y muestra replace()/replaceAll() con regex, la bandera global g y la alternativa new RegExp() cuando el patrón se construye dinámicamente.',
    takeaways: [
      'Leer una regex como una descripción de patrón, no como “código mágico”.',
      'Entender por qué replaceAll() con regex necesita una búsqueda global.',
      'Diferenciar regex literal de RegExp construido desde una string.'
    ],
    drills: makeDrills(
      'Prueba /t\\w{2}e/g contra "time tame tone" y predice las coincidencias.',
      'Usa \\s+ para detectar uno o más espacios consecutivos.',
      'Prueba ^ y $ para anclar el inicio y el final.',
      'Construye una regex equivalente con new RegExp().',
      'Usa String.raw en una regex dinámica para evitar dobles escapes difíciles de leer.'
    ),
    challenge: 'Reemplaza todas las palabras de cuatro letras que empiezan con t y terminan con e por "place".',
    starterCode: `const original = 'Now is the time, this is the tame, not the tone';\n// TODO: crea una regex global que coincida con t + 2 word chars + e\nconst regex = null;\nconst changed = original.replaceAll(regex, 'place');\nconsole.log(changed);\n`,
    validator: ({ output, error }) => !error && /Now is the place, this is the place, not the place/.test(output),
    hint: 'El patrón del cookbook para este caso es t\\w{2}e con bandera g.',
    widget: 'regex',
    regexPattern: 't\\w{2}e',
    regexFlags: 'g',
    regexText: 'Now is the time, this is the tame, not the tone'
  },
  {
    id: 'b2-extract-list',
    order: '2.11',
    title: 'Extrae una lista desde texto libre',
    tag: 'Parsing',
    time: '60 min',
    difficulty: 'Intermedio',
    summary: 'Combina indexOf(), slice(), split() y trim() para convertir una parte de una oración en datos estructurados.',
    concept: 'La receta localiza los límites de una lista, extrae la subcadena y la divide por delimitador; después limpia cada elemento con map() y trim().',
    takeaways: [
      'Encontrar límites con indexOf().',
      'Extraer un segmento con slice().',
      'Convertir texto delimitado en array con split().' 
    ],
    drills: makeDrills(
      'Encuentra el índice del primer : en una oración.',
      'Busca el primer punto después de ese : usando el segundo argumento de indexOf().',
      'Extrae solo el segmento entre ambos índices.',
      'Divide el segmento con split(",").',
      'Limpia cada elemento con map(item => item.trim()).'
    ),
    challenge: 'Implementa extractList(sentence) para obtener un array limpio del texto entre : y el siguiente punto.',
    starterCode: `function extractList(sentence) {\n  // TODO\n}\n\nconst text = 'Pendientes: depurar, probar, documentar, desplegar. Fin.';\nconsole.log(JSON.stringify(extractList(text)));\n`,
    validator: ({ output, error }) => !error && /\["depurar","probar","documentar","desplegar"\]/.test(output),
    hint: 'start = indexOf(":"), end = indexOf(".", start + 1), luego slice y split.'
  },
  {
    id: 'b2-match-all',
    order: '2.12',
    title: 'Encuentra todas las coincidencias y sus posiciones',
    tag: 'RegExp',
    time: '75 min',
    difficulty: 'Intermedio+',
    summary: 'Usa matchAll() para iterar coincidencias, índices y grupos capturados sin perder contexto.',
    concept: 'matchAll() devuelve un iterador de objetos match. Cada resultado contiene el texto completo en match[0], la posición en match.index y, si existen, los grupos capturados en match[1], match[2], etc.',
    takeaways: [
      'Iterar un resultado matchAll() con for...of.',
      'Leer match.index y match[0].',
      'Usar grupos capturados para extraer subpartes del patrón.'
    ],
    drills: makeDrills(
      'Busca /t\\w*e/g en una frase con varias coincidencias.',
      'Imprime índice y texto de cada match.',
      'Convierte el iterador a array con spread.',
      'Crea una regex con un grupo capturado y registra match[1].',
      'Construye un pequeño reporte de coincidencias ordenado por posición.'
    ),
    challenge: 'Devuelve una lista "indice:texto" para cada palabra que empiece con t y termine con e.',
    starterCode: `function findMatches(text) {\n  const regex = /t\\w*e/g;\n  const result = [];\n  // TODO: recorre text.matchAll(regex) y guarda \`index:match\`\n  return result;\n}\n\nconsole.log(JSON.stringify(findMatches('Now is the time and this is the time')));\n`,
    validator: ({ output, error }) => !error && /7:the/.test(output) && /11:time/.test(output) && /28:the/.test(output) && /32:time/.test(output),
    hint: 'Dentro del for...of usa match.index y match[0].',
    widget: 'regex',
    regexPattern: 't\\w*e',
    regexFlags: 'g',
    regexText: 'Now is the time and this is the time and that is the time'
  },
  {
    id: 'b2-whitespace',
    order: '2.13',
    title: 'Limpia whitespace sin destruir el contenido',
    tag: 'Cleanup',
    time: '45 min',
    difficulty: 'Intermedio',
    summary: 'Usa trim() para extremos y regex cuando necesitas colapsar espacios repetidos dentro de una cadena.',
    concept: 'trim() elimina whitespace al principio y al final. Para espacios internos repetidos, la receta combina replaceAll() con un patrón de whitespace.',
    takeaways: [
      'Aplicar trim() cuando solo sobran extremos.',
      'Usar una regex cuando el problema está dentro del texto.',
      'Evitar “limpiar de más” cuando los espacios son semánticos.'
    ],
    drills: makeDrills(
      'Aplica trim() a una cadena con espacios, tab y salto de línea en los extremos.',
      'Colapsa grupos de dos o más espacios a uno.',
      'Compara /\\s\\s+/g con /\\s+/g y explica la diferencia práctica.',
      'Prueba el limpiador con texto ya limpio para confirmar idempotencia.',
      'Construye casos de prueba con whitespace mixto.'
    ),
    challenge: 'Implementa normalizeWhitespace(text): trim en extremos y un solo espacio entre grupos de whitespace.',
    starterCode: `function normalizeWhitespace(text) {\n  // TODO\n}\n\nconsole.log(normalizeWhitespace('   JavaScript   se\\n aprende   practicando   '));\n`,
    validator: ({ output, error }) => !error && /^JavaScript se aprende practicando$/m.test(output.trim()),
    hint: `Primero trim(), después replaceAll(/\\s+/g, ' ').`,
    widget: 'regex',
    regexPattern: '\\s+',
    regexFlags: 'g',
    regexText: 'JavaScript    se\n  aprende\tpracticando'
  },
  {
    id: 'b2-capitalize',
    order: '2.14',
    title: 'Transforma una parte sin tocar el resto',
    tag: 'Slice',
    time: '35 min',
    difficulty: 'Base+',
    summary: 'Aísla el primer carácter, transfórmalo y recompón la cadena con slice().',
    concept: 'La receta obtiene el primer carácter por índice, lo convierte a uppercase y lo une con el resto de la string obtenido con slice(1).',
    takeaways: [
      'Acceder a un carácter por índice.',
      'Extraer secciones con slice(start, end?).',
      'Construir transformaciones pequeñas sin mutar la string original.'
    ],
    drills: makeDrills(
      'Lee el primer carácter con text[0].',
      'Obtén todo excepto el primero con slice(1).',
      'Convierte solo el primer carácter a uppercase.',
      'Prueba tu función con una cadena de un solo carácter.',
      'Define qué debería ocurrir con una cadena vacía y maneja ese caso.'
    ),
    challenge: 'Implementa capitalizeFirst(text) sin alterar las demás letras y manejando cadena vacía.',
    starterCode: `function capitalizeFirst(text) {\n  // TODO\n}\n\nconsole.log(capitalizeFirst('javascript profundo'));\nconsole.log(capitalizeFirst(''));\n`,
    validator: ({ output, error }) => !error && /Javascript profundo/.test(output),
    hint: `Si text está vacío devuelve ''. En otro caso: text[0].toUpperCase() + text.slice(1).`
  },
  {
    id: 'b2-email',
    order: '2.15',
    title: 'Valida formato sin prometer demasiado',
    tag: 'Validation',
    time: '55 min',
    difficulty: 'Intermedio+',
    summary: 'Usa RegExp.test() para filtrar errores obvios de email y entiende los límites de una validación local.',
    concept: 'La receta propone una regex deliberadamente sencilla que exige texto sin whitespace antes y después de @ y un punto posterior. También advierte que una regex no puede demostrar que una dirección existe.',
    takeaways: [
      'Usar RegExp.test() cuando necesitas un booleano.',
      'Evitar validadores tan estrictos que rechacen direcciones legítimas.',
      'Separar “formato plausible” de “dirección verificada”.'
    ],
    drills: makeDrills(
      'Prueba una dirección válida y otra con espacio antes del dominio.',
      'Prueba una dirección sin @ y otra sin punto posterior.',
      'Construye una tabla de casos válidos/invalidos y ejecuta todos.',
      'Explica por qué una regex no puede saber si la bandeja existe.',
      'Diseña el siguiente paso real: confirmación por correo o enlace de verificación.'
    ),
    challenge: 'Implementa looksLikeEmail(value) con una regex sencilla y test().',
    starterCode: `function looksLikeEmail(value) {\n  // TODO: formato plausible, no verificación real\n}\n\nconsole.log(looksLikeEmail('ada@example.com'));\nconsole.log(looksLikeEmail('ada@example .com'));\nconsole.log(looksLikeEmail('adaexample.com'));\n`,
    validator: ({ output, error }) => !error && /^true\s+false\s+false$/m.test(output.replace(/\r/g, '')),
    hint: 'Una base simple es /\\S+@\\S+\\.\\S+/.',
    widget: 'regex',
    regexPattern: '\\S+@\\S+\\.\\S+',
    regexFlags: 'g',
    regexText: 'ada@example.com\nada@example .com\nno-at-symbol.com'
  }
];

export const integrator = {
  title: 'Proyecto integrador — TextForge JS',
  description: 'Construye un pequeño procesador de texto sin frameworks. Recibe datos crudos, valida, normaliza, extrae información, transforma cadenas y genera una salida lista para mostrarse o enviarse a otra capa de la aplicación.',
  deliverables: [
    'isUsefulString() para rechazar entradas vacías o compuestas solo por whitespace.',
    'normalizeWhitespace() y capitalizeFirst() aplicados a nombres y descripciones.',
    'Formato monetario con Intl.NumberFormat reutilizable.',
    'Extracción de etiquetas desde una lista delimitada dentro de una frase.',
    'Búsqueda global con matchAll() que reporte coincidencia + índice.',
    'Validador de email de formato plausible con RegExp.test().',
    'Función para representar snippets HTML como texto seguro en la interfaz.',
    'README de casos límite: emojis, locale, whitespace y lo que la validación de email NO garantiza.'
  ]
};
