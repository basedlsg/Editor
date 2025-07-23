import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const CommentaryDisplay = () => {
  const { commentary, loadingCommentary, darkMode } = useContext(AppContext);

  return (
    <div className={`p-4 rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>
      <h3 className="text-lg font-bold mb-2">Demonic Commentary</h3>
      {loadingCommentary ? (
        <p>Loading...</p>
      ) : (
        <p>{commentary}</p>
      )}
    </div>
  );
};

export default CommentaryDisplay;