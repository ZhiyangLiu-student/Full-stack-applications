import state from './state';
import { fetchMessages } from './services';
import { setMessages, setSessions, setError } from './state';
import render, { renderMessages } from './render';

const appEl = document.querySelector('#app');

export function startMessageRefresh() {
    clearInterval(state.refreshIntervalId);
    state.refreshIntervalId = setInterval(() => {
      if (state.isLoggedIn) {
        fetchMessages().then(response => {
          const { allMessages, allSessions } = response;
          setMessages(allMessages);
          setSessions(allSessions);
          state.error = '';
          renderMessages({ state, appEl });
        }).catch(err => {
          setError(err?.error || 'default');
          render({ state, appEl });
        });
      }
    }, 5000);
  }
