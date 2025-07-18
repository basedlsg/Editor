import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import useAutoSave from '../hooks/useAutoSave';
import useWordCount from '../hooks/useWordCount';
import { calculateGematria } from '../utils/gematria';

const StatusBar = () => {
  const { text, selectedDemon } = useContext(AppContext);
  const wordCount = useWordCount(text);
  const saveStatus = useAutoSave(text, selectedDemon.number);

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center gap-6">
          <span>Words: {wordCount}</span>
          <span>Gematria: {calculateGematria(text)}</span>
          <span>{saveStatus}</span>
        </div>
        <div>
          {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;