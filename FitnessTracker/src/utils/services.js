function fetchAPI (endpoint, options) {
    return fetch(endpoint, options)
      .catch(() => Promise.reject({ error: 'networkError' }))
      .then(response => {
        if (response.ok) {
          return response.json();
        }
  
        return response.json()
          .catch(err => Promise.reject({ error: err }))
          .then(resJson => {
            return Promise.reject({ error: resJson.error });
          });
      });
  }
  export function fetchLogin (username) {
    return fetchAPI('/api/sessions', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({ username }),
    });
  }
  
  export function fetchLogout () {
    return fetchAPI('/api/sessions', {
      method: 'DELETE',
    });
  }
  
  export function fetchAddExercise ({ activityType, duration, userWeight }) {

    return fetchAPI('/api/exercises', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify({ activityType, duration, userWeight }),
    });
  }
  
  export function fetchDeleteExercise (id) {
    return fetchAPI(`/api/exercises/${id}`, {
      method: 'DELETE',
    });
  }
  
  export function fetchExercises () {
    return fetchAPI('/api/exercises');
  }
  
  export function fetchSession () {
    return fetchAPI('/api/sessions', {
      method: 'GET',
    });
  }


  
