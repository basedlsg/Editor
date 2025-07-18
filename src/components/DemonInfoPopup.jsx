import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const DemonInfoPopup = () => {
  const { showInfo, selectedDemon, darkMode } = useContext(AppContext);

  if (!showInfo) {
    return null;
  }

  return (
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 p-6 rounded-lg shadow-lg transition-all ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
    }`}>
      <h3 className="text-xl font-bold mb-2">{selectedDemon.name} - {selectedDemon.rank}</h3>
      <p className="text-sm mb-1">Powers: {selectedDemon.powers}</p>
      <p className="text-sm mb-1">Element: {selectedDemon.element}</p>
      <p className="text-sm">Planet: {selectedDemon.planet}</p>
    </div>
  );
};

export default DemonInfoPopup;