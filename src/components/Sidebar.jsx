import { LockKeyhole, CheckCircle2, Braces, ChevronRight, Layers3 } from 'lucide-react';

export default function Sidebar({ roadmap, block, activeBlockId, onBlockSelect, active, onSelect, progress }) {
  const completed = block.lessons.filter((lesson) => progress.lessons?.[lesson.id]?.completed).length;
  const pct = Math.round((completed / block.lessons.length) * 100);

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">JS</div>
        <div>
          <strong>JavaScriptLab</strong>
          <span>AI · práctica profunda</span>
        </div>
      </div>

      <div className="block-switcher">
        <p className="nav-label">BLOQUES DISPONIBLES</p>
        {roadmap.filter((item) => item.unlocked).map((item) => (
          <button
            key={item.id}
            className={activeBlockId === item.id ? 'block-chip active' : 'block-chip'}
            onClick={() => onBlockSelect(item.id)}
          >
            <span>{item.id.replace('b', '').padStart(2, '0')}</span>
            <div><b>{item.title}</b><small>{item.subtitle}</small></div>
          </button>
        ))}
      </div>

      <div className="sidebar-progress">
        <div className="row-between"><span>Bloque {block.number}</span><b>{pct}%</b></div>
        <div className="progress-track"><span style={{ width: `${pct}%` }} /></div>
        <small>{completed} de {block.lessons.length} recetas dominadas</small>
      </div>

      <nav className="lesson-nav" aria-label={`Lecciones del bloque ${block.number}`}>
        <p className="nav-label">RECETAS ACTIVAS</p>
        <button className={active === 'dashboard' ? 'nav-item active' : 'nav-item'} onClick={() => onSelect('dashboard')}>
          <Braces size={17} /> <span>Panel del bloque</span><ChevronRight size={15} />
        </button>
        {block.lessons.map((lesson) => {
          const done = progress.lessons?.[lesson.id]?.completed;
          return (
            <button key={lesson.id} className={active === lesson.id ? 'nav-item active' : 'nav-item'} onClick={() => onSelect(lesson.id)}>
              {done ? <CheckCircle2 size={17} /> : <span className="lesson-number">{lesson.order}</span>}
              <span>{lesson.title}</span>
              <ChevronRight size={15} />
            </button>
          );
        })}
      </nav>

      <div className="roadmap-mini">
        <p className="nav-label">LO QUE SIGUE</p>
        {roadmap.filter((item) => !item.unlocked).slice(0, 5).map((item) => (
          <div className="locked-row" key={item.id}>
            <LockKeyhole size={14} />
            <span>{item.title}</span>
          </div>
        ))}
        <div className="more-roadmap"><Layers3 size={13}/> + {Math.max(0, roadmap.filter((item) => !item.unlocked).length - 5)} bloques posteriores</div>
      </div>
    </aside>
  );
}
