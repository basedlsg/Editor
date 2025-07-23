const Groq = require("groq-sdk");
const { llama } = require("../config/keys");
const { demons } = require("../constants/demons");

const groq = new Groq({ apiKey: llama });

async function getCommentary(demonId, text) {
  const demon = demons.find(d => d.number === demonId);
  if (!demon) {
    throw new Error("Demon not found");
  }

  const prompt = `You are ${demon.name}, a ${demon.rank} from the Ars Goetia. Your personality is shaped by your association with the zodiac sign ${demon.zodiac}, the planet ${demon.planet}, the metal ${demon.metal}, and the element ${demon.element}. Please provide commentary on the following text in a style that reflects your unique demonic nature:\n\n${text}`;

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama3-8b-8192",
  });

  return chatCompletion.choices[0]?.message?.content || "";
}

module.exports = { getCommentary };