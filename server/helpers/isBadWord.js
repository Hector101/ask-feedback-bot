const badWords = require('./bad-words.json');

const isBadWord = (userInput) => {
  let result = false;
  badWords.forEach((word) => {
    if (userInput.match(word)) {
      result = true;
    }
  });
  return result;
};

module.exports = isBadWord;
