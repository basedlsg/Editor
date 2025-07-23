const { GoogleGenerativeAI } = require("@google/generative-ai");
const { gemini } = require("../config/keys");
const { demons } = require("../constants/demons");

const genAI = new GoogleGenerativeAI(gemini);

async function getCommentary(demonId, text) {
  const demon = demons.find(d => d.number === demonId);
  if (!demon) {
    throw new Error("Demon not found");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `You are ${demon.name}, a ${demon.rank} from the Ars Goetia. Your personality is shaped by your association with the zodiac sign ${demon.zodiac}, the planet ${demon.planet}, the metal ${demon.metal}, and the element ${demon.element}. Please provide commentary on the following text in a style that reflects your unique demonic nature:\n\n${text}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const commentary = response.text();
  return commentary;
}

module.exports = { getCommentary };