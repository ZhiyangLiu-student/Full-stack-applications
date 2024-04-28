const webPage = require('../V/webPage');
const uuidv4 = require('uuid').v4;
const controller = require('./controller')
const users = require('../M/users');
const words = require('../words')


const sessions = {};

const pages = {
    homePage: function(req, res){
        const sid = req.cookies.sid;
        if(sid && sessions[sid]) {
            const username = sessions[sid].username;
            if(!users[username]) {
                users.set(username);
            }
            if(users[username].isWin){
                res.send(webPage.success());
                return;
            }
            const answer = users[username].answer;
            console.log(`The player is ${username} and the answer is ${answer}`);
            res.send(webPage.guessPage(username, answer));
            return;
        }
        res.send(webPage.loginPage());
    },

    loginPage: function(req, res){
        const username = req.body.username.trim();
        const errors = controller.checkUsername(username);
        if(errors.includes('username cannot be dog')){
            res.status(403).send(webPage.loginFail(errors));
            return;
        }
        if(errors){
            res.status(401).send(webPage.loginFail(errors));
            return;
        }
        const sid = uuidv4();
        sessions[sid] = {username};
        res.cookie('sid', sid);
        res.redirect('/');

    },

    guess: function(req, res){
        let guessedWord = req.body.guessedWord;
        const sid = req.cookies.sid;
        const username = sessions[sid].username;
        const answer = users[username].answer;
        users[username].invalid = false;
        users[username].occured = false;
        if (!guessedWord) {
            res.redirect('/');
        } else if (!words.includes(guessedWord)) {
            users[username].invalid = true;
            res.redirect('/');
        } else if (users[username].guessList[guessedWord]) {
            users[username].occured = true;
            res.redirect('/');
        } else if (guessedWord === answer) {
            users[username].isWin = true;
            res.redirect('/');
        } else {
            const matches = controller.correctGuessedLetters(username, guessedWord);
            const turns = Object.keys(users[username].guessList).length + 1;
            users[username].guessList[guessedWord] = {
                matches: matches,
                turns: turns
            }
            res.redirect('/');
        }
    },

    newGame: function(req, res){
        const sid = req.cookies.sid;

        if(sid && sessions[sid]) {
            const username = sessions[sid].username;
            users.setNewWord(username);
            users[username].guessList = [];
            users[username].isWin = false;
            res.redirect('/');
        } else {
            res.send(webPage.loginFail('Please login at first!'));
        }
    },

    logout: function(req, res){
        const sid = req.cookies.sid;
        delete sessions[sid];
        res.clearCookie('sid');
        res.redirect('/');
    }
}

module.exports = pages;