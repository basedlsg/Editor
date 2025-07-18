import React from 'react';
import ControlPanel from './ControlPanel';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 p-4 z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <ControlPanel />
      </div>
    </header>
  );
};

export default Header;