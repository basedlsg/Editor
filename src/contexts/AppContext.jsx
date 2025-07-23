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
  const [commentary, setCommentary] = useState('');
  const [loadingCommentary, setLoadingCommentary] = useState(false);

  const toggleDarkMode = () => setDarkMode(prevMode => !prevMode);

  const getCommentary = async () => {
    setLoadingCommentary(true);
    try {
      const response = await fetch('/api/commentary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, demonId: selectedDemon.number }),
      });
      const data = await response.json();
      setCommentary(data.commentary);
    } catch (error) {
      console.error('Error fetching commentary:', error);
      setCommentary('Error fetching commentary.');
    } finally {
      setLoadingCommentary(false);
    }
  };

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
    commentary,
    setCommentary,
    loadingCommentary,
    setLoadingCommentary,
    getCommentary,
  }), [selectedDemon, text, darkMode, showSigil, sigilOpacity, showInfo, commentary, loadingCommentary]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};