import React, { useContext, useEffect } from 'react';
import { AppContext, AppProvider } from './contexts/AppContext';
import Header from './components/Header';
import Editor from './components/Editor';
import StatusBar from './components/StatusBar';
import SigilDisplay from './components/SigilDisplay';
import DemonInfoPopup from './components/DemonInfoPopup';

const App = () => {
  const { darkMode } = useContext(AppContext);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-theme' : 'light-theme';
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-colors duration-500">
      <Header />
      <Editor />
      <StatusBar />
      <SigilDisplay />
      <DemonInfoPopup />
    </div>
  );
};

const AppWrapper = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

export default AppWrapper;