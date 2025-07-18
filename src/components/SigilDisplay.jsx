import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const SigilDisplay = () => {
  const { showSigil, selectedDemon, sigilOpacity, darkMode } = useContext(AppContext);

  if (!showSigil) {
    return null;
  }

  const sigilNumber = String(selectedDemon.number).padStart(2, '0');
  const sigilUrl = `/sigils/${sigilNumber}.svg`;
  const fallbackSigilUrl = `/sigils/${sigilNumber}.png`;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      <img
        src={sigilUrl}
        onError={(e) => { e.target.onerror = null; e.target.src = fallbackSigilUrl; }}
        alt={`${selectedDemon.name} Sigil`}
        className="w-[600px] h-[600px] transition-opacity duration-1000"
        style={{
          opacity: sigilOpacity,
          filter: darkMode ? 'invert(1)' : 'invert(0)',
        }}
      />
    </div>
  );
};

export default SigilDisplay;