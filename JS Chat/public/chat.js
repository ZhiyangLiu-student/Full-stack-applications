/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addEventListeners: () => (/* binding */ addEventListeners),
/* harmony export */   handleLogin: () => (/* binding */ handleLogin)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");



function handleLogin(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl,
    startMessageRefresh = _ref.startMessageRefresh;
  appEl.addEventListener('submit', function (e) {
    if (!e.target.classList.contains('login-form')) {
      return;
    }
    e.preventDefault();
    var username = appEl.querySelector('.login-username').value;
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnLogin)();
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: state,
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (response) {
      var allMessages = response.allMessages,
        allSessions = response.allSessions;
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)();
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(allMessages);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setSessions)(allSessions);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
      startMessageRefresh();
    })["catch"](function (err) {
      state.isLoginPending = false;
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'default');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function handleLogout(_ref2) {
  var state = _ref2.state,
    appEl = _ref2.appEl;
  appEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('controls-logout')) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)()["catch"](function (err) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'default');
        (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
          state: state,
          appEl: appEl
        });
      });
    }
  });
}
function handleMessageAddition(_ref3) {
  var state = _ref3.state,
    appEl = _ref3.appEl,
    startMessageRefresh = _ref3.startMessageRefresh;
  appEl.addEventListener('submit', function (e) {
    if (!e.target.classList.contains('add-form')) {
      return;
    }
    e.preventDefault();
    var message = appEl.querySelector('.add-message').value;
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: state,
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchAddMessage)(message).then(function (response) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.addMessage)(response);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
      startMessageRefresh();
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'default');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function enableButton(_ref4) {
  var appEl = _ref4.appEl;
  appEl.addEventListener('input', function (e) {
    var messageInput = appEl.querySelector('.add-message');
    var submitButton = appEl.querySelector('.add-button');
    submitButton.disabled = messageInput.value.trim() === '';
  });
}
function addEventListeners(_ref5) {
  var state = _ref5.state,
    appEl = _ref5.appEl,
    startMessageRefresh = _ref5.startMessageRefresh;
  handleLogin({
    state: state,
    appEl: appEl,
    startMessageRefresh: startMessageRefresh
  });
  handleLogout({
    state: state,
    appEl: appEl
  });
  handleMessageAddition({
    state: state,
    appEl: appEl,
    startMessageRefresh: startMessageRefresh
  });
  enableButton({
    appEl: appEl
  });
}

/***/ }),

/***/ "./src/messageRefresh.js":
/*!*******************************!*\
  !*** ./src/messageRefresh.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startMessageRefresh: () => (/* binding */ startMessageRefresh)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");




var appEl = document.querySelector('#app');
function startMessageRefresh() {
  clearInterval(_state__WEBPACK_IMPORTED_MODULE_0__["default"].refreshIntervalId);
  _state__WEBPACK_IMPORTED_MODULE_0__["default"].refreshIntervalId = setInterval(function () {
    if (_state__WEBPACK_IMPORTED_MODULE_0__["default"].isLoggedIn) {
      (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchMessages)().then(function (response) {
        var allMessages = response.allMessages,
          allSessions = response.allSessions;
        (0,_state__WEBPACK_IMPORTED_MODULE_0__.setMessages)(allMessages);
        (0,_state__WEBPACK_IMPORTED_MODULE_0__.setSessions)(allSessions);
        _state__WEBPACK_IMPORTED_MODULE_0__["default"].error = '';
        (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderMessages)({
          state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
          appEl: appEl
        });
      })["catch"](function (err) {
        (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'default');
        (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
          state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
          appEl: appEl
        });
      });
    }
  }, 5000);
}

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   renderMessages: () => (/* binding */ renderMessages)
/* harmony export */ });
function render(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  var html = "\n        ".concat(getStatusHtml(state), "\n        ").concat(getLoginHtml(state), "\n        ").concat(getContentHtml({
    state: state
  }), "\n    ");
  appEl.innerHTML = html;
}
function renderMessages(_ref2) {
  var state = _ref2.state,
    appEl = _ref2.appEl;
  var userListEl = appEl.querySelector('.users');
  var messagesEl = appEl.querySelector('.messages');
  userListEl.innerHTML = getUsersHtml(state);
  messagesEl.innerHTML = getMessagesHtml(state);
}
function getStatusHtml(state) {
  return "\n        <div class=\"status\">".concat(state.error, "</div>\n    ");
}
function getLoginHtml(state) {
  if (state.isLoginPending) {
    return "\n      <p class=\"status\">Loading chat...</p>\n    ";
  }
  if (state.isLoggedIn) {
    return "";
  }
  return "\n      <div class=\"login\">\n        <form class=\"login-form\" action=\"#/login\">\n          <label>Username: </label>\n          <input class=\"login-username\" value=\"\">\n          <button class=\"login-button\" type=\"submit\">Login</button>\n        </form>\n      </div>\n  ";
}
function getContentHtml(_ref3) {
  var state = _ref3.state;
  if (!state.isLoggedIn) {
    return "";
  }
  return "\n        <div class=\"user-list\">\n          <h2>Users:</h2>\n          <ul class=\"users\">".concat(getUsersHtml(state), "</ul>\n          ").concat(getControlsHtml(), "\n        </div>\n        <div class=\"chat-list\">\n          <h2>Messages:</h2>\n          <ul class=\"messages\">").concat(getMessagesHtml(state), "</ul>  \n          ").concat(getAddMessageHtml(), "\n        </div>\n    ");
}
function getUsersHtml(state) {
  var usernames = Object.values(state.sessions).map(function (user) {
    return user.username;
  });
  var uniqueUsernames = [];
  usernames.forEach(function (username) {
    if (!uniqueUsernames.includes(username)) {
      uniqueUsernames.push(username);
    }
  });
  var usersHtml = uniqueUsernames.map(function (username) {
    return "\n      <li class=\"user\">\n        <p>".concat(username, "</p>\n      </li>\n    ");
  }).join('');
  return usersHtml || "";
}
function getMessagesHtml(state) {
  var messagesHtml = Object.values(state.messages).map(function (data) {
    var message = data.message,
      username = data.username;
    return "\n        <li class=\"message\">\n          <p class=\"username\">".concat(username, ": </p>\n          <p>").concat(message, "</p>\n        </li>\n        ");
  }).join('') || "";
  return messagesHtml;
}
function getAddMessageHtml() {
  return "\n      <form class=\"add-form\" action=\"#/add\">\n        <input class=\"add-message\">\n        <button type=\"submit\" class=\"add-button\"  disabled>send</button>\n      </form>\n    ";
}
function getControlsHtml() {
  return "\n      <div class=\"controls\">\n        <button class=\"controls-logout\">Logout</button>\n      </div>\n    ";
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchAddMessage: () => (/* binding */ fetchAddMessage),
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchMessages: () => (/* binding */ fetchMessages),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession)
/* harmony export */ });
function fetchAddMessage(message) {
  return fetch('/api/messages', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      message: message
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchMessages() {
  return fetch('/api/messages')["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchSession() {
  return fetch('/api/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchLogin(username) {
  return fetch('/api/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

/***/ }),

/***/ "./src/sessionCheck.js":
/*!*****************************!*\
  !*** ./src/sessionCheck.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkForSession: () => (/* binding */ checkForSession)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _messageRefresh__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./messageRefresh */ "./src/messageRefresh.js");





function checkForSession(appEl) {
  (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchSession)().then(function () {
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.login)();
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
      appEl: appEl
    });
    (0,_messageRefresh__WEBPACK_IMPORTED_MODULE_3__.startMessageRefresh)(appEl);
    return (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchMessages)();
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === 'auth-missing') {
      return Promise.reject(new Error('no-session'));
    }
    return Promise.reject(err);
  }).then(function (response) {
    var allMessages = response.allMessages,
      allSessions = response.allSessions;
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setMessages)(allMessages);
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setSessions)(allSessions);
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
      appEl: appEl
    });
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addMessage: () => (/* binding */ addMessage),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   setError: () => (/* binding */ setError),
/* harmony export */   setMessages: () => (/* binding */ setMessages),
/* harmony export */   setSessions: () => (/* binding */ setSessions),
/* harmony export */   waitOnLogin: () => (/* binding */ waitOnLogin),
/* harmony export */   waitOnMessages: () => (/* binding */ waitOnMessages)
/* harmony export */ });
var ERROR_MESSAGES = {
  'network-error': 'Your internet is bad. Please try again.',
  'auth-insufficient': 'Cannot use dog as username, please try again.',
  'required-username': 'Please enter a valid username.',
  'auth-missing': 'Authentication is missing. Please login.',
  'no-session': 'No active session found. Please login again.',
  'default': 'Something went wrong. Please try again.'
};
var state = {
  messages: {},
  sessions: {},
  isLoggedIn: false,
  isLoginPending: false,
  error: ''
};
function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.messages = {};
  state.sessions = {};
  state.error = '';
}
function login() {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.error = '';
}
function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.messages = {};
  state.sessions = {};
  state.error = '';
}
function waitOnMessages() {
  state.messages = {};
  state.error = '';
}
function setMessages(messages) {
  state.messages = messages;
  state.error = '';
}
function setSessions(sessions) {
  state.sessions = sessions;
  state.error = '';
}
function addMessage(message) {
  var id = message.id;
  state.messages[id] = message;
  state.error = '';
}
function setError(error) {
  if (!error) {
    state.error = '';
    return;
  }
  state.error = ERROR_MESSAGES[error] || ERROR_MESSAGES["default"];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/chat.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");
/* harmony import */ var _messageRefresh__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./messageRefresh */ "./src/messageRefresh.js");
/* harmony import */ var _sessionCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sessionCheck */ "./src/sessionCheck.js");





var appEl = document.querySelector('#app');
function init() {
  (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
    state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
    appEl: appEl
  });
  (0,_listeners__WEBPACK_IMPORTED_MODULE_2__.addEventListeners)({
    state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
    appEl: appEl,
    startMessageRefresh: _messageRefresh__WEBPACK_IMPORTED_MODULE_3__.startMessageRefresh
  });
  (0,_sessionCheck__WEBPACK_IMPORTED_MODULE_4__.checkForSession)(appEl);
}
init();
})();

/******/ })()
;
//# sourceMappingURL=chat.js.map