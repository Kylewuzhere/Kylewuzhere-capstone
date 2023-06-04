const crypto = require("crypto");

// Returns a random integer between min and max
function getRandomInt(min, max) {
  const Clamp = (num, min, max) => Math.min(Math.max(num, min), max);
  return Clamp(Math.floor(Math.random() * max), min, max);
}

// Returns a random UUID
function GenerateUUID() {
  return crypto.randomUUID();
}

module.exports = { getRandomInt, GenerateUUID };
