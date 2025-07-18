import { useEffect, useState } from 'react';

const useAutoSave = (text, demonNumber) => {
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      if (text.length > 0) {
        localStorage.setItem(`goetic_manuscript_${demonNumber}`, text);
        setSaveStatus('Saved');
        setTimeout(() => setSaveStatus(''), 2000);
      }
    }, 13000); // Save every 13 seconds

    return () => {
      clearTimeout(handler);
    };
  }, [text, demonNumber]);

  return saveStatus;
};

export default useAutoSave;