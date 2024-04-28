function render ({ state, appEl }) {
    const html = `
        ${getStatusHtml(state)}
        ${getLoginHtml(state)}
        ${getContentHtml({ state })}
    `;
    appEl.innerHTML = html;
  }
  
export function renderMessages ({ state, appEl }) {
    const userListEl = appEl.querySelector('.users');
    const messagesEl = appEl.querySelector('.messages');
  
    userListEl.innerHTML = getUsersHtml(state);
    messagesEl.innerHTML = getMessagesHtml(state);
}
  
function getStatusHtml (state) {
    return `
        <div class="status">${state.error}</div>
    `;
}
  
function getLoginHtml (state) {
  if (state.isLoginPending) {
    return `
      <p class="status">Loading chat...</p>
    `
  }
  if (state.isLoggedIn) {
    return ``;
  }
  return `
      <div class="login">
        <form class="login-form" action="#/login">
          <label>Username: </label>
          <input class="login-username" value="">
          <button class="login-button" type="submit">Login</button>
        </form>
      </div>
  `;
}
  
function getContentHtml ({ state }) {
    if (!state.isLoggedIn) {
      return ``;
    }
    return `
        <div class="user-list">
          <h2>Users:</h2>
          <ul class="users">${getUsersHtml(state)}</ul>
          ${getControlsHtml()}
        </div>
        <div class="chat-list">
          <h2>Messages:</h2>
          <ul class="messages">${getMessagesHtml(state)}</ul>  
          ${getAddMessageHtml()}
        </div>
    `;
}
  
function getUsersHtml(state) {
    const usernames = Object.values(state.sessions).map(user => user.username);
    const uniqueUsernames = [];
    usernames.forEach(username => {
      if (!uniqueUsernames.includes(username)) {
        uniqueUsernames.push(username);
      }
    });
    const usersHtml = uniqueUsernames.map(username => `
      <li class="user">
        <p>${username}</p>
      </li>
    `).join('');
    return usersHtml || ``;
  }
  
function getMessagesHtml (state) {
    const messagesHtml = Object.values(state.messages).map(data => {
      const { message, username } = data;
      return `
        <li class="message">
          <p class="username">${username}: </p>
          <p>${message}</p>
        </li>
        `;
    }).join('') || ``;
    return messagesHtml;
}
  
function getAddMessageHtml () {
    return `
      <form class="add-form" action="#/add">
        <input class="add-message">
        <button type="submit" class="add-button"  disabled>send</button>
      </form>
    `;
}
  
function getControlsHtml () {
    return `
      <div class="controls">
        <button class="controls-logout">Logout</button>
      </div>
    `;
}
  
export default render