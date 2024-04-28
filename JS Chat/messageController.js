const sessions = require('./sessions');
const users = require('./users');
const messages = require('./messages');

exports.getMessages = (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json({ allMessages: messages.getMessages(), allSessions: sessions.getSessions() });
};

exports.postMessage = (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const { message } = req.body;
    const id = messages.addMessage(message, username);
    res.json({ id, message, username });
};
