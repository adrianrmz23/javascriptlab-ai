import { ArrowRight, BookOpenCheck, Braces, Bug, Code2, FlaskConical, Hammer, Search, Terminal, Type, Zap } from 'lucide-react';

const visualIcon = (label) => {
  if (label === 'terminal') return <Terminal size={17}/>;
  if (label === 'debug') return <Bug size={17}/>;
  if (label === 'build') return <Code2 size={17}/>;
  if (label === 'strings') return <Type size={17}/>;
  if (label === 'unicode') return <Braces size={17}/>;
  return <Search size={17}/>;
};

export default function Dashboard({ block, progress, onStart }) {
  const lessons = block.lessons;
  const completed = lessons.filter((l) => progress.lessons?.[l.id]?.completed).length;
  const totalDrills = lessons.reduce((sum, lesson) => sum + lesson.drills.length, 0);
  const next = lessons.find((l) => !progress.lessons?.[l.id]?.completed) || lessons[0];

  return (
    <main className="page dashboard-page">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="eyebrow">{block.eyebrow}</span>
          <h1>{block.heroTitle} <em>{block.heroEmphasis}</em></h1>
          <p>{block.description}</p>
          <div className="hero-actions">
            <button className="primary-cta" onClick={() => onStart(next.id)}>{completed ? 'Continuar bloque' : 'Empezar ahora'} <ArrowRight size={18}/></button>
            <span>{completed}/{lessons.length} recetas completadas</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className={`js-tile ${block.id === 'b2' ? 'regex-tile' : ''}`}>{block.visualMark}</div>
          {block.visualCards.map((item, index) => (
            <div key={item} className={`orbit-card card-${String.fromCharCode(97 + index)}`}>{visualIcon(item)} {item}</div>
          ))}
        </div>
      </section>

      <section className="metric-grid">
        <article><span><BookOpenCheck size={19}/></span><b>{lessons.length}</b><p>recetas prácticas</p></article>
        <article><span><Hammer size={19}/></span><b>{totalDrills}</b><p>drills de manos al código</p></article>
        <article><span><FlaskConical size={19}/></span><b>{lessons.length}</b><p>labs ejecutables</p></article>
        <article><span><Zap size={19}/></span><b>1</b><p>proyecto integrador</p></article>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div><span className="eyebrow">TU RUTA DE HOY</span><h2>Aprende → predice → programa → depura</h2></div>
          <p>No hay lecciones “solo lectura”: cada receta termina con drills y un reto validable; en RegExp y Unicode además tienes laboratorios visuales.</p>
        </div>
        <div className="recipe-grid">
          {lessons.map((lesson) => {
            const state = progress.lessons?.[lesson.id];
            return <button key={lesson.id} onClick={() => onStart(lesson.id)} className="recipe-card">
              <div className="recipe-top"><span className="recipe-index">{lesson.order}</span><span className="pill">{lesson.tag}</span></div>
              <h3>{lesson.title}</h3><p>{lesson.summary}</p>
              <div className="recipe-footer"><span>{lesson.time}</span><span className={state?.completed ? 'status done' : 'status'}>{state?.completed ? 'Dominada' : 'Practicar'} <ArrowRight size={14}/></span></div>
            </button>;
          })}
        </div>
      </section>

      <section className="integrator-card">
        <div><span className="eyebrow">CIERRE DEL BLOQUE</span><h2>{block.integrator.title}</h2><p>{block.integrator.description}</p></div>
        <div className="deliverables">{block.integrator.deliverables.map((item, i) => <div key={item}><span>{String(i + 1).padStart(2, '0')}</span><p>{item}</p></div>)}</div>
      </section>
    </main>
  );
}
