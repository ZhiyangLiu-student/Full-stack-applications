const users = require('../M/users')
const controller = {
    checkUsername: function (username) {
        const errors = [];
        const valid = username.replace(/[^A-Za-z0-9_]+/g, '');
    
        if(valid === 'dog') {
            errors.push('Username cannot be dog.');
        }
        if (valid !== username) {
            errors.push('Include invalid characters!');
        }
        if (!username) {
            errors.push('Username was empty, please input your username.');
        }
        return errors.length ? errors : '';
    },

    checkValid: function (username) {
        if(users[username].invalid) {
            return `The word is not on the list, please check the Word List.`;
        }
        else if (users[username].occured){
            return 'This word has been guessed.'
        } 
        return ``;
    },

    guessedWordsPost: function (username) {
        let htmlString = '<ul class="guessedWords">';
    
        for (let word in users[username].guessList) {
            if (users[username].guessList.hasOwnProperty(word)) {
                htmlString += `
                    <li>
                        <div class="word">
                            <p>#${users[username].guessList[word]['turns']} ${word} matches ${users[username].guessList[word]['matches']}</p>
                        </div>
                    </li>
                `;
            }
        }
    
        htmlString += '</ul>';
        return htmlString;
    },
    

    correctGuessedLetters: function (username, guessedWord) {
        const ans = users[username].answer;
        let matches = 0;
        const letterCount = {};

        for (let letter of ans.toLowerCase()) {
            if (letterCount[letter]) {
                letterCount[letter] += 1;
            } else {
                letterCount[letter] = 1;
            }
        }

        for (let letter of guessedWord.toLowerCase()) {
            if (letterCount[letter]) {
                letterCount[letter] -= 1;
                matches += 1;
            }
        }
        console.log(`You matched: ${matches} letters`);
        return matches;
    },
}

module.exports = controller;