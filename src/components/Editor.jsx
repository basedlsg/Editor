import React, { useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';

const Editor = () => {
  const { text, setText, selectedDemon, darkMode } = useContext(AppContext);

  // Load saved text when demon changes
  useEffect(() => {
    const saved = localStorage.getItem(`goetic_manuscript_${selectedDemon.number}`);
    if (saved) {
      setText(saved);
    } else {
      setText('');
    }
  }, [selectedDemon, setText]);

  return (
    <div className="pt-20 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Begin your work with ${selectedDemon.name}...`}
          className={`w-full min-h-screen p-8 text-lg leading-relaxed bg-transparent focus:outline-none resize-none ${
            darkMode ? 'placeholder-gray-600' : 'placeholder-gray-400'
          }`}
          style={{ fontFamily: 'Georgia, serif' }}
        />
      </div>
    </div>
  );
};

export default Editor;