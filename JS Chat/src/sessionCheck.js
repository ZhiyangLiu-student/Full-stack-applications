import state from './state';
import { fetchSession, fetchMessages } from './services';
import { login, setMessages, setSessions} from './state';
import render from './render';
import { startMessageRefresh } from './messageRefresh';

export function checkForSession (appEl) {
    fetchSession()
      .then(() => {
        login();
        render({ state, appEl });
        startMessageRefresh(appEl);
        return fetchMessages();
      })
      .catch(err => {
        if (err?.error === 'auth-missing') {
          return Promise.reject(new Error('no-session'));
        }
        return Promise.reject(err);
      })
      .then(response => {
        const { allMessages, allSessions } = response;
        setMessages(allMessages);
        setSessions(allSessions);
        render({ state, appEl });
      })
}
