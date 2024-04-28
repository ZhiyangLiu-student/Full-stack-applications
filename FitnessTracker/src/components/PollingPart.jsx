import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { LOGIN_STATUS } from '../utils/constants';
import TotalCaloriesBurned from './TotalCaloriesBurned'; 
import ActivitySummary from './ActivitySummary'; 
import ExerciseList from './ExerciseList';

const PollingPart = () => {
  const { loginStatus, onRefresh } = useContext(GlobalContext);

  useEffect(() => {
    let intervalId;
    if (loginStatus === LOGIN_STATUS.IS_LOGGED_IN) {
      onRefresh();
      intervalId = setInterval(onRefresh, 5000); 
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [loginStatus]);

  return (
    <>
      <TotalCaloriesBurned />
      <ActivitySummary />
      <ExerciseList />
    </>
  );
};

export default PollingPart;
