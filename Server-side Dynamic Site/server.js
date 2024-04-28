const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const pageController = require('./C/pageController')


app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('./public'));

app.get('/', pageController.homePage);
app.post('/login', pageController.loginPage);
app.post('/guess', pageController.guess);
app.post('/new-game', pageController.newGame);
app.post('/logout', pageController.logout);


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
