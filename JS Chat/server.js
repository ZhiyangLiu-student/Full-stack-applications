const express = require('express');
const cookieParser = require('cookie-parser');
const sessionController = require('./sessionController');
const messageController = require('./messageController');

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

app.get('/api/session', sessionController.getSession);
app.post('/api/session', sessionController.createSession);
app.delete('/api/session', sessionController.deleteSession);

app.get('/api/messages', messageController.getMessages);
app.post('/api/messages', messageController.postMessage);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
