import { createContext, useReducer, useEffect } from 'react';
import { reducer, initialState } from './reducer';
import {
  fetchLogin,
  fetchLogout,
  fetchExercises, 
  fetchDeleteExercise, 
  fetchAddExercise, 
  fetchSession,
} from '../utils/services';
import { ACTIONS, CLIENT, SERVER } from '../utils/constants';

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateUserWeight = (weight) => {
    dispatch({ type: ACTIONS.UPDATE_USER_WEIGHT, weight });
  };

  function onLogin(username) {
    dispatch({ type: ACTIONS.START_LOADING_EXERCISE }); 
    fetchLogin(username)
      .then((exercises) => {
        dispatch({ type: ACTIONS.LOG_IN, username });
        dispatch({
          type: ACTIONS.REPLACE_EXERCISES, 
          exercises: exercises,
        });
        dispatch({ type: ACTIONS.UPDATE_USER_WEIGHT, weight: userWeight });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onLogout() {
    dispatch({ type: ACTIONS.LOG_OUT });
    fetchLogout().catch((err) => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
    });
    dispatch({ type: ACTIONS.UPDATE_USER_WEIGHT, weight: 0 });
  }

  function onRefresh() {
    dispatch({ type: ACTIONS.START_LOADING_EXERCISE }); 
    fetchExercises()
      .then((exercises) => {
        dispatch({ type: ACTIONS.REPLACE_EXERCISES, exercises }); 
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          dispatch({ type: ACTIONS.LOG_OUT });
          return;
        }
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function deleteExercise(id) {
    dispatch({ type: ACTIONS.START_LOADING_EXERCISE }); 
    fetchDeleteExercise(id)
      .then(() => {
        return fetchExercises();
      })
      .then((exercises) => {
        dispatch({ type: ACTIONS.REPLACE_EXERCISES, exercises }); 
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          dispatch({ type: ACTIONS.LOG_OUT });
          return;
        }
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function addExercise(exercise) {
    fetchAddExercise(exercise)
      .then((exercise) => {
        dispatch({ type: ACTIONS.ADD_EXERCISE, exercise }); 
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          dispatch({ type: ACTIONS.LOG_OUT });
          return;
        }
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function checkForSession() {
    fetchSession()
      .then((session) => {
        dispatch({ type: ACTIONS.LOG_IN, username: session.username });
        return fetchExercises();
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION });
        }
        return Promise.reject(err);
      })
      .then((exercises) => {
        dispatch({ type: ACTIONS.REPLACE_EXERCISES, exercises }); 
      })
      .catch((err) => {
        if (err?.error === CLIENT.NO_SESSION) {
          dispatch({ type: ACTIONS.LOG_OUT });
          return;
        }
        if (err?.error === SERVER.AUTH_MISSING) {
          return;
        }
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  useEffect(() => {
    checkForSession();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        deleteExercise, 
        addExercise, 
        onLogin,
        onLogout,
        onRefresh,
        checkForSession,
        updateUserWeight,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
