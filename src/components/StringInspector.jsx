import { useEffect, useMemo, useState } from 'react';
import { Braces, ScanText } from 'lucide-react';

export default function StringInspector({ initialText = 'JavaScript 🍔' }) {
  const [text, setText] = useState(initialText);
  useEffect(() => setText(initialText), [initialText]);
  const stats = useMemo(() => {
    const codePoints = [...text];
    return {
      length: text.length,
      codePoints: codePoints.length,
      trimmed: text.trim().length,
      escaped: JSON.stringify(text),
      points: codePoints.slice(0, 12).map((char) => `${char} U+${char.codePointAt(0).toString(16).toUpperCase()}`)
    };
  }, [text]);

  return (
    <section className="interactive-lab string-inspector">
      <div className="interactive-head">
        <div className="interactive-icon"><ScanText size={20}/></div>
        <div><span className="eyebrow">LAB VISUAL · STRING INSPECTOR</span><h3>Mira lo que JavaScript realmente está contando</h3></div>
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} aria-label="Texto para inspeccionar" />
      <div className="string-stats">
        <article><span>.length</span><b>{stats.length}</b><small>unidades UTF-16</small></article>
        <article><span>[...text]</span><b>{stats.codePoints}</b><small>code points</small></article>
        <article><span>trim()</span><b>{stats.trimmed}</b><small>longitud sin extremos</small></article>
      </div>
      <div className="inspector-output">
        <div><Braces size={16}/><span>Representación escapada</span></div>
        <code>{stats.escaped}</code>
        <div className="codepoint-row">{stats.points.map((point, index) => <span key={`${point}-${index}`}>{point}</span>)}</div>
      </div>
    </section>
  );
}
