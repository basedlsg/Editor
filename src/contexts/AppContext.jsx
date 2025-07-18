import React, { createContext, useState, useMemo } from 'react';
import { demons } from '../constants/demons';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedDemon, setSelectedDemon] = useState(demons[0]);
  const [text, setText] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [showSigil, setShowSigil] = useState(true);
  const [sigilOpacity, setSigilOpacity] = useState(0.15);
  const [showInfo, setShowInfo] = useState(false);

  const toggleDarkMode = () => setDarkMode(prevMode => !prevMode);

  const value = useMemo(() => ({
    selectedDemon,
    setSelectedDemon,
    text,
    setText,
    darkMode,
    toggleDarkMode,
    showSigil,
    setShowSigil,
    sigilOpacity,
    setSigilOpacity,
    showInfo,
    setShowInfo,
    demons,
  }), [selectedDemon, text, darkMode, showSigil, sigilOpacity, showInfo]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};