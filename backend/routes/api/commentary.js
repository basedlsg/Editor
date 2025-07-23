const express = require('express');
const router = express.Router();
const { getCommentary: getGeminiCommentary } = require('../../services/gemini');
const { getCommentary: getLlamaCommentary } = require('../../services/llama');

// @route   POST api/commentary
// @desc    Get AI commentary
// @access  Public
router.post('/', async (req, res) => {
  const { demonId, text } = req.body;

  if (!demonId || !text) {
    return res.status(400).json({ error: 'Invalid request body. demonId and text are required.' });
  }

  try {
    const [geminiCommentary, llamaCommentary] = await Promise.all([
      getGeminiCommentary(demonId, text),
      getLlamaCommentary(demonId, text)
    ]);

    const commentary = `Gemini:\n${geminiCommentary}\n\nLLaMA:\n${llamaCommentary}`;
    res.json({ commentary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while generating commentary.' });
  }
});

module.exports = router;