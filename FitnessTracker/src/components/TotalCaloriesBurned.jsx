import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import UserProfile from './UserProfile';

const TotalCaloriesBurned = () => {
  const { exercises } = useContext(GlobalContext);

  let totalCalories = 0;
  Object.values(exercises).forEach(exercise => {
    const calories = parseFloat(exercise.caloriesBurned);
    if (!isNaN(calories)) {
      totalCalories += calories;
    }
  });

  return (
    <>
      <h4>Total Calories Burned</h4>
      <h1>{totalCalories.toFixed(2)} Cal</h1>
      <UserProfile /> 
    </>
  );
};

export default TotalCaloriesBurned;


