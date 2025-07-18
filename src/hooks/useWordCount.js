import { useState, useEffect } from 'react';

const useWordCount = (text) => {
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [text]);

  return wordCount;
};

export default useWordCount;