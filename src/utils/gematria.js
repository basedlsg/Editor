export const calculateGematria = (text) => {
  // Simple English gematria (A=1, B=2, etc.)
  return text.toUpperCase().split('').reduce((sum, char) => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      return sum + (code - 64);
    }
    return sum;
  }, 0);
};