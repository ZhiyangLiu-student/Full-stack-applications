const controller = require('../C/controller');
const words = require('../words');

const webPage = {
    loginPage: function() {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <link rel="stylesheet" href="style.css">
                <title>Welcome</title>
            </head>
            <body>
            <header>
                <h1>Login to start the game</h1>
            </header>
                <form action="/login" method="POST">
                    <lable>
                        <span>Username: </span><input type="text" name="username" placeholder="Please input your username.">
                    </lable>
                    <button class="login-bt" type="submit">Login</button>
                </form>
            </body>
            </html>
        `;
    },

    loginFail: function (errors) {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <link rel="stylesheet" href="style.css">
                <title>Login Fail</title>
            </head>
            <body>
            <header>
                <h1>Opps...Something goes wrong...</h1>
            </header>
                <div class="errors">
                    <p>${errors}</p>
                    <p>Please <a href="/">Retry</a></p>  
                </div>                  
            </body>
            </html>
        `
    },

    guessPage: function (username, guessedWord, answer) {
        let wordList = '<p>';
        for(let i = 0; i < words.length; i++) {
            if( i !== 0 && i % 15 === 0) {
                wordList += '<br>' + words[i] + ' ';
            } else {
                wordList += words[i] + ' ';
            }
        }
        wordList += '</p>';
        return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <link rel="stylesheet" href="style.css">
            <title>Guess Word Game</title>
        </head>
        <body>
        <header>
            <h2>Guess the Word</h2>
        </header>
            <div>
                <p class="user-info">Username: ${username}</p>
                <div class="option">
                    <form class="option-form" action="/logout" method="POST"><button type="submit">Logout</button></form>
                    <form class="option-form" action="/new-game" method="POST"><button type="submit">New Game</buttom></form>
                </div>
                <div class="word-list">
                    <h3>World List</h3>
                    ${wordList}
                </div>
                <div>
                    <input type="hidden" name="answer">
                    <div>
                        <form class="input-form" action="/guess" method="POST">
                            <input class="input-guess-text" name="guessedWord" value="" placeholder="Please input your guess" required/>
                            <button type="submit">Submit</buttom>
                        </form>
                    </div>
                    <div class="error-message">
                        ${controller.checkValid(username)}
                    </div>
                    <div class="wrong-answers">
                        <div class="wrong-label">Your Guess</div>
                        ${controller.guessedWordsPost(username)}
                    </div>
                </div>
            </div>
        </body>
        </html>
        `
    },
    success: function(){
        return`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="style.css">
            <title>Winner</title>
        </head>
        <body>
            <div class="winning-page">
                <p>You are the Winner!</p>
                <form class="back-home" action="/new-game" method="post">
                    <button type="submit">Play Again!</button>
                </form>
            </div>
        </body>
        </html>
        `;
    }
    

}

module.exports = webPage;