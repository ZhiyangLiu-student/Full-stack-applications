import { fetchLogin, fetchLogout, fetchMessages, fetchAddMessage } from './services';
import { waitOnLogin, login, logout, setMessages, setSessions, setError, addMessage, waitOnMessages} from './state';
import render, { renderMessages } from './render';

export function handleLogin({ state, appEl, startMessageRefresh }) {
  appEl.addEventListener('submit', (e) => {
    if (!e.target.classList.contains('login-form')) {
      return;
    }
    e.preventDefault();

    const username = appEl.querySelector('.login-username').value;

    waitOnLogin();
    render({ state, appEl });
    fetchLogin(username)
      .then(response => {
        const { allMessages, allSessions } = response;
        login();
        setMessages(allMessages);
        setSessions(allSessions);
        render({ state, appEl });
        startMessageRefresh();
      })
      .catch(err => {
        state.isLoginPending = false; 
        setError(err?.error || 'default');
        render({ state, appEl });
      });
  });
}

function handleLogout({ state, appEl }) {
  appEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('controls-logout')) {
      logout();
      render({ state, appEl });
      fetchLogout().catch(err => {
        setError(err?.error || 'default');
        render({ state, appEl });
      });
    }
  });
}

function handleMessageAddition({ state, appEl, startMessageRefresh }) {
  appEl.addEventListener('submit', (e) => {
    if (!e.target.classList.contains('add-form')) {
      return;
    }
      e.preventDefault();
      const message = appEl.querySelector('.add-message').value;
      render({ state, appEl });
      fetchAddMessage(message)
        .then(response => {
          addMessage(response);
          render({ state, appEl });
          startMessageRefresh();
        })
        .catch(err => {
          setError(err?.error || 'default');
          render({ state, appEl });
        });
  });
}

function enableButton({ appEl }) {
  appEl.addEventListener('input', (e) => {
    const messageInput = appEl.querySelector('.add-message');
    const submitButton = appEl.querySelector('.add-button');
    submitButton.disabled = messageInput.value.trim() === '';
  });
}

export function addEventListeners({ state, appEl, startMessageRefresh }) {
  handleLogin({ state, appEl, startMessageRefresh });
  handleLogout({ state, appEl });
  handleMessageAddition({ state, appEl, startMessageRefresh });
  enableButton({ appEl });
}

