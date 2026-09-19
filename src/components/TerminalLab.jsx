import { useState } from 'react';
import { TerminalSquare, CheckCircle2 } from 'lucide-react';

const responses = {
  'node -v': 'v22.x.x\n✓ Node está disponible',
  'npm -v': '10.x.x\n✓ npm está disponible',
  'npm init -y': 'Wrote to ./package.json\n✓ proyecto inicializado',
  'npm outdated': 'Package   Current   Wanted   Latest\nexample   1.2.0     1.2.3    2.0.0',
  'npm update': 'updated packages\n✓ recuerda revisar cambios y pruebas',
  'npm run dev': '> dev\n> servidor de desarrollo\nLocal: http://localhost:5173/',
};

export default function TerminalLab({ tasks = [] }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [done, setDone] = useState([]);

  const submit = (event) => {
    event.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;
    const output = responses[cmd] || `command not found: ${cmd}\nPrueba uno de los comandos objetivo.`;
    setHistory((h) => [...h, { cmd, output }]);
    if (tasks.includes(cmd)) setDone((d) => [...new Set([...d, cmd])]);
    setInput('');
  };

  return (
    <section className="terminal-lab">
      <div className="terminal-heading"><TerminalSquare size={19}/><div><b>Terminal Sandbox</b><span>Simula los comandos del flujo antes de ejecutarlos en tu PC.</span></div></div>
      <div className="terminal-window">
        <div className="terminal-dots"><i/><i/><i/><span>jslab — zsh</span></div>
        <div className="terminal-history">
          <p className="terminal-muted">JavaScriptLab sandbox · comandos permitidos de esta práctica</p>
          {history.map((item, index) => <div key={`${item.cmd}-${index}`}><p><span className="prompt">❯</span> {item.cmd}</p><pre>{item.output}</pre></div>)}
          <form onSubmit={submit}><span className="prompt">❯</span><input autoComplete="off" value={input} onChange={(e) => setInput(e.target.value)} placeholder="escribe un comando..." /></form>
        </div>
      </div>
      <div className="terminal-tasks">
        {tasks.map((task) => <span className={done.includes(task) ? 'done' : ''} key={task}>{done.includes(task) && <CheckCircle2 size={14}/>} {task}</span>)}
      </div>
    </section>
  );
}
