import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Shuffle } from 'lucide-react';

const DemonSelector = () => {
  const { selectedDemon, setSelectedDemon, demons, darkMode, setShowInfo, setCommentary, setLoadingCommentary, text } = useContext(AppContext);

  const handleDemonChange = (demon) => {
    setSelectedDemon(demon);
    setShowInfo(true);
    setTimeout(() => setShowInfo(false), 3000);
  };

  const handleRandomDemon = () => {
    const randomIndex = Math.floor(Math.random() * demons.length);
    handleDemonChange(demons[randomIndex]);
  };

  const getCommentary = async () => {
    setLoadingCommentary(true);
    try {
      const response = await fetch('/api/commentary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ demonId: selectedDemon.number, text }),
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

  return (
    <div className="flex items-center gap-4">
      <select
        value={selectedDemon.number}
        onChange={(e) => handleDemonChange(demons.find(d => d.number === parseInt(e.target.value)))}
        className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} focus:outline-none`}
      >
        {demons.map(demon => (
          <option key={demon.number} value={demon.number}>
            {demon.number}. {demon.name} - {demon.rank}
          </option>
        ))}
      </select>
      <button
        onClick={handleRandomDemon}
        className={`p-2 rounded ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
        title="Random Demon"
        aria-label="Select a random demon"
      >
        <Shuffle size={20} />
      </button>
      <button
        onClick={getCommentary}
        className={`px-4 py-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
      >
        Get Commentary
      </button>
    </div>
  );
};

export default DemonSelector;