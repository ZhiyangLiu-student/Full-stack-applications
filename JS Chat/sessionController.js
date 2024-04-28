const sessions = require('./sessions');
const users = require('./users');
const messages = require('./messages');

exports.getSession = (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json({ username });
};

exports.createSession = (req, res) => {
    const { username } = req.body;
    if (!users.isValid(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
    }
    if (username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }
    const sid = sessions.addSession(username);
    res.cookie('sid', sid);
    const allMessages = messages.getMessages();
    const allSessions = sessions.getSessions();
    res.json({ allMessages, allSessions });
};

exports.deleteSession = (req, res) => {
    const sid = req.cookies.sid;
    if (sid) {
        res.clearCookie('sid');
        sessions.deleteSession(sid);
    }
    res.json({ username: sessions.getSessionUser(sid) });
};
