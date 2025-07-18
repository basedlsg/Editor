import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import DemonSelector from './DemonSelector';
import { Moon, Sun, Eye, EyeOff, FileText } from 'lucide-react';
import { exportText } from '../utils/fileExporter';

const ControlPanel = () => {
  const {
    darkMode,
    toggleDarkMode,
    showSigil,
    setShowSigil,
    sigilOpacity,
    setSigilOpacity,
    text,
    selectedDemon,
  } = useContext(AppContext);

  return (
    <>
      <DemonSelector />
      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowSigil(!showSigil)}
          className={`p-2 rounded ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
          title="Toggle Sigil"
          aria-label="Toggle Sigil"
        >
          {showSigil ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
        <input
          type="range"
          min="5"
          max="30"
          value={sigilOpacity * 100}
          onChange={(e) => setSigilOpacity(e.target.value / 100)}
          className="w-24"
          title="Sigil Opacity"
        />
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
          title="Toggle Dark Mode"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          onClick={() => exportText(text, selectedDemon.name)}
          className={`p-2 rounded ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
          title="Export Text"
          aria-label="Export Text"
        >
          <FileText size={20} />
        </button>
      </div>
    </>
  );
};

export default ControlPanel;