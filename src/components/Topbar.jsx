import { Search, Flame, Trophy } from 'lucide-react';

export default function Topbar({ completedCount }) {
  return (
    <header className="topbar">
      <div className="searchbox"><Search size={17}/><input placeholder="Buscar concepto, receta o práctica..." /></div>
      <div className="top-stats">
        <span><Flame size={17}/> Racha <b>1</b></span>
        <span><Trophy size={17}/> Dominadas <b>{completedCount}</b></span>
        <div className="avatar">AR</div>
      </div>
    </header>
  );
}
