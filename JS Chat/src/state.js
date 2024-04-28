const ERROR_MESSAGES = {
  'network-error': 'Your internet is bad. Please try again.',
  'auth-insufficient': 'Cannot use dog as username, please try again.',
  'required-username': 'Please enter a valid username.',
  'auth-missing': 'Authentication is missing. Please login.',
  'no-session': 'No active session found. Please login again.',
  'default': 'Something went wrong. Please try again.',
};

const state = {
  messages: {},
  sessions: {},
  isLoggedIn: false,
  isLoginPending: false,
  error: '',
};

export function waitOnLogin () {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.messages = {};
  state.sessions = {};
  state.error = '';
}

export function login () {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.error = '';
}

export function logout () {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.messages = {};
  state.sessions = {};
  state.error = '';
}

export function waitOnMessages () {
  state.messages = {};
  state.error = '';
}

export function setMessages (messages) {
  state.messages = messages;
  state.error = '';
}

export function setSessions (sessions) {
  state.sessions = sessions;
  state.error = '';
}


export function addMessage (message) {
  const { id } = message;
  state.messages[id] = message;
  state.error = '';
}


export function setError (error) {
  if (!error) {
    state.error = '';
    return;
  }
  state.error = ERROR_MESSAGES[error] || ERROR_MESSAGES.default;
}
export default state;