const fs = require('fs');

const words = [];
try {
  const data = fs.readFileSync('one_million_words.txt', 'utf8');
  for (const word of data.split("\n")) {
    words.push(word);
  }
} catch (err) {
  console.error(err);
}

module.exports = words;