import { useEffect, useMemo, useState } from 'react';
import { Play, RotateCcw, Lightbulb, CheckCircle2, XCircle } from 'lucide-react';

function runUserCode(code) {
  const lines = [];
  const mockConsole = {
    log: (...args) => lines.push(args.map(String).join(' ')),
    warn: (...args) => lines.push(`⚠ ${args.map(String).join(' ')}`),
    error: (...args) => lines.push(`✖ ${args.map(String).join(' ')}`),
    count: (() => {
      const counts = {};
      return (label = 'default') => { counts[label] = (counts[label] || 0) + 1; lines.push(`${label}: ${counts[label]}`); };
    })(),
    assert: (condition, ...args) => { if (!condition) lines.push(`Assertion failed: ${args.map(String).join(' ')}`); },
    time: () => {},
    timeEnd: (label = 'default') => lines.push(`${label}: timer finalizado`),
    group: (...args) => lines.push(`▾ ${args.map(String).join(' ')}`),
    groupEnd: () => {},
    trace: () => lines.push('trace() → stack disponible en DevTools real'),
    dir: (value) => lines.push(JSON.stringify(value, null, 2)),
  };

  try {
    const fn = new Function('console', code);
    fn(mockConsole);
    return { output: lines.join('\n'), error: '' };
  } catch (err) {
    return { output: lines.join('\n'), error: `${err.name}: ${err.message}` };
  }
}

export default function CodeLab({ lesson, onPass }) {
  const [code, setCode] = useState(lesson.starterCode);
  const [result, setResult] = useState({ output: '', error: '' });
  const [status, setStatus] = useState('idle');
  const [hint, setHint] = useState(false);

  const lineCount = useMemo(() => code.split('\n').length, [code]);

  useEffect(() => {
    setCode(lesson.starterCode);
    setResult({ output: '', error: '' });
    setStatus('idle');
    setHint(false);
  }, [lesson.id, lesson.starterCode]);

  const execute = () => {
    const next = runUserCode(code);
    setResult(next);
    const passed = lesson.validator({ ...next, code });
    setStatus(passed ? 'pass' : 'fail');
    if (passed) onPass?.();
  };

  return (
    <section className="code-lab">
      <div className="lab-head">
        <div><span className="eyebrow">LAB · EJECUTA Y CORRIGE</span><h3>{lesson.challenge}</h3></div>
        <div className="lab-actions">
          <button className="ghost-button" onClick={() => { setCode(lesson.starterCode); setResult({ output:'', error:'' }); setStatus('idle'); }}><RotateCcw size={16}/> Reiniciar</button>
          <button className="run-button" onClick={execute}><Play size={16} fill="currentColor"/> Ejecutar</button>
        </div>
      </div>
      <div className="editor-shell">
        <div className="editor-toolbar"><span>challenge.js</span><span>{lineCount} líneas</span></div>
        <textarea spellCheck="false" value={code} onChange={(e) => setCode(e.target.value)} aria-label="Editor JavaScript" />
      </div>
      <div className="console-shell">
        <div className="console-title">CONSOLA</div>
        <pre>{result.output || '// La salida aparecerá aquí.'}{result.error ? `\n${result.error}` : ''}</pre>
      </div>
      <div className={`result-banner ${status}`}>
        {status === 'pass' && <><CheckCircle2 size={18}/><span>Reto superado. Ya cuenta para tu dominio de la receta.</span></>}
        {status === 'fail' && <><XCircle size={18}/><span>Todavía no coincide con el objetivo. Lee la salida y depura.</span></>}
        {status === 'idle' && <><span className="dot"/><span>Modifica el código y ejecútalo. La validación es automática.</span></>}
        <button onClick={() => setHint((v) => !v)}><Lightbulb size={16}/> Pista</button>
      </div>
      {hint && <div className="hint-box">{lesson.hint}</div>}
    </section>
  );
}
