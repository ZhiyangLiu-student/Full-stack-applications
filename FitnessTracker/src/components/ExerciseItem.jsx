import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Exercise = ({ exercise }) => {
  const { deleteExercise } = useContext(GlobalContext);

  const exerciseTypeClass = exercise.activityType ? exercise.activityType.toLowerCase() : 'default';

  return (
    <li className={exerciseTypeClass}> 
      <span>{exercise.activityType} </span>
      <span>{exercise.duration} mins </span> 
      <span>--{exercise.caloriesBurned} cal</span> 
      <button onClick={() => deleteExercise(exercise.id)} className="delete-btn">
        x
      </button>
    </li>
  );
};

export default Exercise;
