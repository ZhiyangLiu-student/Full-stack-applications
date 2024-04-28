const words = require('../words');

const users = {
    set: function (username) {
        users[username] = {
            guessList: [],
            answer: getRandomWord(words),
            invalid: false,
            occured: false,
            isWin: false
        }
    },

    setNewWord: function (username) {
        users[username].answer = getRandomWord(words);
    }
};

const getRandomWord = function (words) {
    const pickNumber = Math.floor(Math.random() * words.length);
    return words[pickNumber].toLowerCase();
}

module.exports = users;