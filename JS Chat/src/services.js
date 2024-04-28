export function fetchAddMessage (message) {
    return fetch('/api/messages', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify({ message }),
    })
      .catch(() => Promise.reject({ error: 'network-error' }))
      .then( response => {
        if(!response.ok) {
          return response.json().then( err => Promise.reject(err) );
        }
        return response.json(); 
      });
    }
  
  
  export function fetchMessages () {
    return fetch('/api/messages')
      .catch(() => Promise.reject({ error: 'network-error' }))
      .then( response => {
        if(!response.ok) {
          return response.json().then( err => Promise.reject(err) );
        }
        return response.json(); 
      });
    }
  
  export function fetchSession () {
    return fetch('/api/session', {
      method: 'GET',
    })
      .catch(() => Promise.reject({ error: 'network-error' }))
      .then( response => {
        if(!response.ok) {
          return response.json().then( err => Promise.reject(err) );
        }
        return response.json(); 
      });
    }
  
  export function fetchLogout () {
    return fetch('/api/session', {
      method: 'DELETE',
    })
      .catch(() => Promise.reject({ error: 'network-error' }))
      .then( response => {
        if(!response.ok) {
          return response.json().then( err => Promise.reject(err) );
        }
        return response.json(); 
      });
    }
  
  export function fetchLogin (username) {
    return fetch('/api/session', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({ username }),
    })
      .catch(() => Promise.reject({ error: 'network-error' }))
      .then( response => {
        if(!response.ok) {
          return response.json().then( err => Promise.reject(err) );
        }
        return response.json(); 
      });
    }

