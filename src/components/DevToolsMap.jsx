import { useState } from 'react';

const panels = {
  Console: 'Mensajes, errores y experimentos rápidos. Tu primera parada cuando algo no hace lo esperado.',
  Elements: 'Inspecciona el DOM y las reglas CSS aplicadas; prueba cambios temporales en vivo.',
  Sources: 'Explora archivos cargados, coloca breakpoints y sigue la ejecución paso a paso.',
  Network: 'Observa recursos y peticiones: estado, tamaño, tiempo y datos enviados.',
  Performance: 'Mide cuánto tarda el código y detecta trabajo costoso en el navegador.',
  Application: 'Revisa cookies, almacenamiento local e IndexedDB de la aplicación.'
};

export default function DevToolsMap() {
  const [active, setActive] = useState('Console');
  return (
    <section className="devtools-map">
      <div className="browser-bar"><span/><span/><span/><div>localhost:5173</div></div>
      <div className="devtools-tabs">{Object.keys(panels).map((name) => <button className={active === name ? 'active' : ''} onClick={() => setActive(name)} key={name}>{name}</button>)}</div>
      <div className="devtools-panel"><span className="panel-kicker">PANEL {active.toUpperCase()}</span><p>{panels[active]}</p></div>
    </section>
  );
}
