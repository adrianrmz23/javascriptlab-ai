import { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import LessonView from './components/LessonView';
import { blocks, roadmap } from './data/course';

const STORAGE_KEY = 'javascriptlab-progress-v2';
const OLD_STORAGE_KEY = 'javascriptlab-b1-progress';
const emptyBlock = () => ({ lessons: {} });

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.blocks) return saved;

    const old = JSON.parse(localStorage.getItem(OLD_STORAGE_KEY));
    if (old?.lessons) {
      return { blocks: { b1: old, b2: emptyBlock() } };
    }
  } catch {
    // Si el storage fue alterado, arrancamos con progreso limpio.
  }
  return { blocks: { b1: emptyBlock(), b2: emptyBlock() } };
}

export default function App() {
  const [activeBlockId, setActiveBlockId] = useState('b2');
  const [active, setActive] = useState('dashboard');
  const [progress, setProgress] = useState(loadProgress);

  const block = blocks[activeBlockId] || blocks.b1;
  const blockProgress = progress.blocks?.[activeBlockId] || emptyBlock();

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }, [progress]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [active, activeBlockId]);

  const totalCompleted = useMemo(() => Object.values(blocks).reduce((sum, currentBlock) => {
    const current = progress.blocks?.[currentBlock.id]?.lessons || {};
    return sum + currentBlock.lessons.filter((lesson) => current[lesson.id]?.completed).length;
  }, 0), [progress]);

  const lesson = block.lessons.find((item) => item.id === active);

  const patchLesson = (blockId, id, patcher) => {
    setProgress((current) => {
      const currentBlock = current.blocks?.[blockId] || emptyBlock();
      const previous = currentBlock.lessons?.[id] || { drills: [], labPassed: false, completed: false };
      return {
        ...current,
        blocks: {
          ...current.blocks,
          [blockId]: {
            ...currentBlock,
            lessons: { ...currentBlock.lessons, [id]: patcher(previous) }
          }
        }
      };
    });
  };

  const toggleDrill = (lessonId, drillId) => patchLesson(activeBlockId, lessonId, (prev) => {
    const drills = prev.drills || [];
    return { ...prev, drills: drills.includes(drillId) ? drills.filter((id) => id !== drillId) : [...drills, drillId] };
  });

  const selectBlock = (id) => {
    if (!roadmap.find((item) => item.id === id)?.unlocked) return;
    setActiveBlockId(id);
    setActive('dashboard');
  };

  return (
    <div className={`app-shell block-${activeBlockId}`}>
      <Sidebar
        roadmap={roadmap}
        block={block}
        activeBlockId={activeBlockId}
        onBlockSelect={selectBlock}
        active={active}
        onSelect={setActive}
        progress={blockProgress}
      />
      <div className="content-shell">
        <Topbar completedCount={totalCompleted} />
        {active === 'dashboard' ? (
          <Dashboard block={block} progress={blockProgress} onStart={setActive} />
        ) : lesson ? (
          <LessonView
            block={block}
            lesson={lesson}
            progress={blockProgress}
            onBack={() => setActive('dashboard')}
            onToggleDrill={toggleDrill}
            onPass={(id) => patchLesson(activeBlockId, id, (prev) => ({ ...prev, labPassed: true }))}
            onComplete={(id) => patchLesson(activeBlockId, id, (prev) => ({ ...prev, completed: true }))}
          />
        ) : null}
        <footer>JavaScriptLab AI · aprende construyendo · Bloque {block.number}</footer>
      </div>
    </div>
  );
}
