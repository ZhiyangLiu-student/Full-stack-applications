import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const ActivitySummary = () => {
  const { exercises } = useContext(GlobalContext);

  const totalExercises = Object.keys(exercises).length;

  let totalCalories = 0;
  Object.values(exercises).forEach(exercise => {
    if (typeof exercise.caloriesBurned === 'number') {
      totalCalories += exercise.caloriesBurned;
    }
  });

  return (
    <div className="activity-summary-container">
      <div>
        <h4>Total Exercises</h4>
        <p className="summary total">{totalExercises}</p>
      </div>
    </div>
  );
};

export default ActivitySummary;

