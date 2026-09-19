import { useEffect, useMemo, useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

export default function RegexPlayground({ initialPattern = '\\w+', initialFlags = 'g', initialText = 'JavaScript se aprende practicando' }) {
  const [pattern, setPattern] = useState(initialPattern);
  const [flags, setFlags] = useState(initialFlags);
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setPattern(initialPattern);
    setFlags(initialFlags);
    setText(initialText);
  }, [initialPattern, initialFlags, initialText]);

  const result = useMemo(() => {
    try {
      const effectiveFlags = flags.includes('g') ? flags : `${flags}g`;
      const regex = new RegExp(pattern, effectiveFlags);
      const matches = [...text.matchAll(regex)].slice(0, 50).map((match) => ({
        value: match[0],
        index: match.index,
        groups: match.slice(1)
      }));
      return { error: '', matches, effectiveFlags };
    } catch (error) {
      return { error: error.message, matches: [], effectiveFlags: flags };
    }
  }, [pattern, flags, text]);

  return (
    <section className="interactive-lab regex-playground">
      <div className="interactive-head">
        <div className="interactive-icon"><Search size={20}/></div>
        <div><span className="eyebrow">LAB VISUAL · REGEX ARENA</span><h3>Edita el patrón y observa coincidencias + índices</h3></div>
      </div>
      <div className="regex-controls">
        <label><span>Patrón</span><div className="regex-input"><b>/</b><input value={pattern} onChange={(e) => setPattern(e.target.value)} /><b>/</b></div></label>
        <label className="flags-field"><span>Flags</span><input value={flags} onChange={(e) => setFlags(e.target.value.replace(/[^dgimsuvy]/g, ''))} maxLength={8}/></label>
      </div>
      <label className="regex-text"><span>Texto de prueba</span><textarea value={text} onChange={(e) => setText(e.target.value)} /></label>
      {result.error ? (
        <div className="regex-error">Regex inválida: {result.error}</div>
      ) : (
        <div className="match-panel">
          <div className="match-summary"><Sparkles size={16}/><b>{result.matches.length}</b> coincidencias · ejecución global /{result.effectiveFlags}</div>
          <div className="match-list">
            {result.matches.length ? result.matches.map((match, index) => (
              <div key={`${match.index}-${index}`}>
                <span>#{index + 1}</span><code>{match.value || '(vacío)'}</code><small>index {match.index}</small>
                {match.groups.some((g) => g !== undefined) && <small>grupos: {JSON.stringify(match.groups)}</small>}
              </div>
            )) : <p>Sin coincidencias. Modifica patrón o texto y observa qué cambia.</p>}
          </div>
        </div>
      )}
    </section>
  );
}
