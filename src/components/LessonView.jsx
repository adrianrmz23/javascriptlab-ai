import { ArrowLeft, Check, CheckCircle2, Clock3, Gauge, Layers3 } from 'lucide-react';
import CodeLab from './CodeLab';
import TerminalLab from './TerminalLab';
import DevToolsMap from './DevToolsMap';
import StringInspector from './StringInspector';
import RegexPlayground from './RegexPlayground';

export default function LessonView({ block, lesson, progress, onBack, onToggleDrill, onPass, onComplete }) {
  const lessonProgress = progress.lessons?.[lesson.id] || { drills: [] };
  const doneDrills = lessonProgress.drills || [];
  const allDrills = doneDrills.length === lesson.drills.length;

  return (
    <main className="page lesson-page">
      <button className="back-link" onClick={onBack}><ArrowLeft size={16}/> Volver al bloque</button>
      <section className="lesson-hero">
        <div>
          <span className="eyebrow">RECETA {lesson.order} · {lesson.tag.toUpperCase()}</span>
          <h1>{lesson.title}</h1>
          <p>{lesson.summary}</p>
          <div className="lesson-meta"><span><Clock3 size={16}/>{lesson.time}</span><span><Gauge size={16}/>{lesson.difficulty}</span><span><Layers3 size={16}/>{lesson.drills.length} drills + 1 lab</span></div>
        </div>
        <div className="lesson-number-big">{lesson.order}</div>
      </section>

      <div className="lesson-layout">
        <div className="lesson-main">
          <section className="content-card">
            <span className="eyebrow">QUÉ ESTÁS ENTRENANDO</span>
            <p className="lead-copy">{lesson.concept}</p>
            <div className="takeaway-list">{lesson.takeaways.map((item) => <div key={item}><Check size={17}/><span>{item}</span></div>)}</div>
          </section>

          {lesson.id === 'console' && <DevToolsMap />}
          {lesson.terminal && <TerminalLab tasks={lesson.terminalTasks} />}
          {lesson.widget === 'string' && <StringInspector initialText={lesson.inspectorText} />}
          {lesson.widget === 'regex' && <RegexPlayground initialPattern={lesson.regexPattern} initialFlags={lesson.regexFlags} initialText={lesson.regexText} />}

          <section className="drills-card">
            <div className="section-heading compact"><div><span className="eyebrow">DRILLS</span><h2>Hazlo tú, no lo leas solamente</h2></div><b>{doneDrills.length}/{lesson.drills.length}</b></div>
            <div className="drill-list">{lesson.drills.map((drill) => {
              const done = doneDrills.includes(drill.id);
              return <button key={drill.id} className={done ? 'drill done' : 'drill'} onClick={() => onToggleDrill(lesson.id, drill.id)}><span className="check-box">{done && <Check size={15}/>}</span><p>{drill.text}</p></button>;
            })}</div>
          </section>

          <CodeLab lesson={lesson} onPass={() => onPass(lesson.id)} />

          <section className="mastery-card">
            <div><span className="eyebrow">MASTER CHECK</span><h2>¿Ya puedes hacerlo sin copiar?</h2><p>Marca la receta como dominada cuando hayas hecho los drills y superado el lab. Puedes volver cuando quieras.</p></div>
            <button disabled={!allDrills || !lessonProgress.labPassed} onClick={() => onComplete(lesson.id)} className="master-button">{lessonProgress.completed ? <CheckCircle2 size={18}/> : null}{lessonProgress.completed ? 'Receta dominada' : 'Marcar como dominada'}</button>
          </section>
        </div>

        <aside className="lesson-aside">
          <div className="sticky-note"><span>REGLA DEL LAB</span><strong>Predice primero. Ejecuta después. Lee el resultado. Cambia una sola cosa.</strong><p>En strings y regex es especialmente fácil “adivinar”. Escribe tu predicción antes de ejecutar.</p></div>
          <div className="source-note"><span>BASE DE CONTENIDO</span><b>JavaScript Cookbook · 3ª edición</b><p>{block.sourceLabel}. La plataforma convierte las recetas en actividades originales, retos y herramientas interactivas.</p></div>
        </aside>
      </div>
    </main>
  );
}
