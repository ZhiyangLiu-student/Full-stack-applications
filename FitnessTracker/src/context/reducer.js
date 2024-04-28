import { LOGIN_STATUS, ACTIONS } from "../utils/constants";

export const initialState = {
  exercises: {}, 
  error: '',
  username: '',
  userWeight: 0,
  loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
  isExercisePending: false, 
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.DELETE_EXERCISE: 
      const { [action.id]: removedExercise, ...remainingExercises } = state.exercises;
      return {
        ...state,
        exercises: remainingExercises
      };

    case ACTIONS.ADD_EXERCISE: 
      return {
        ...state,
        exercises: {
          ...state.exercises,
          [action.exercise.id]: action.exercise
        }
      };

    case ACTIONS.REPLACE_EXERCISES: 
      return {
        ...state,
        error: '',
        isExercisePending: false, 
        exercises: action.exercises,
      };

    case ACTIONS.START_LOADING_EXERCISE: 
      return {
        ...state,
        error: '',
        isExercisePending: true, 
      };

    case ACTIONS.LOG_IN:
      return {
        ...state,
        error: '',
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
        username: action.username,
      };

    case ACTIONS.LOG_OUT:
      return {
        ...state,
        error: '',
        isExercisePending: false, 
        exercises: {}, 
        loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
        username: '',
      };

    case ACTIONS.REPORT_ERROR:
      return {
        ...state,
        error: action.error || 'ERROR',
      };

    case ACTIONS.UPDATE_USER_WEIGHT:
      return {
        ...state,
        userWeight: action.weight,
      };
      
    default:
      return state;
  }
}
