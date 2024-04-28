import state from './state';
import render, { renderMessages } from './render';
import { addEventListeners } from './listeners';
import { startMessageRefresh } from './messageRefresh';
import { checkForSession } from './sessionCheck';

const appEl = document.querySelector('#app');


function init() {
  render({ state, appEl });
  addEventListeners({ state, appEl, startMessageRefresh });
  checkForSession(appEl);
}

init();
