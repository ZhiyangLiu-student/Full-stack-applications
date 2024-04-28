export const LOGIN_STATUS = {
    PENDING: 'pending',
    NOT_LOGGED_IN: 'notLoggedIn',
    IS_LOGGED_IN: 'loggedIn',
  };
  
  export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_EXERCISE: 'required-exercise',
    EXERCISE_MISSING: 'noSuchId', 
  };
  
  export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession',
  };
  
  export const MESSAGES = {
    [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network. Please try again',
    [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
    [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (letters and/or numbers) username',
    [SERVER.REQUIRED_EXERCISE]: 'Please enter the exercise details', 
    default: 'Something went wrong. Please try again',
  };
  
  export const ACTIONS = {
    LOG_IN: 'logIn',
    LOG_OUT: 'logOut',
    START_LOADING_EXERCISE: 'startLoadingExercises', 
    REPLACE_EXERCISES: 'replaceExercises',
    REPORT_ERROR: 'reportError',
    DELETE_EXERCISE: 'deleteExercise', 
    ADD_EXERCISE: 'addExercise',
    UPDATE_USER_WEIGHT: 'updateUserWeight', 
  };
  