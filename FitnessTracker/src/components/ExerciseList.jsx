import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import ExerciseItem from './ExerciseItem';
import Loading from './Loading';

export const ExerciseList = () => {
  const { exercises, isExercisePending } = useContext(GlobalContext); 

  const SHOW = {
    PENDING: 'pending',
    EMPTY: 'empty',
    SHOWED: 'showed',
  };

  let show;
  if (isExercisePending) { 
    show = SHOW.PENDING;
  } else if (!Object.keys(exercises).length) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.SHOWED;
  }

  return (
    <>
      {show === SHOW.PENDING && <Loading>Loading Exercises...</Loading>} 
      <h3>Activity History</h3>
      {show === SHOW.EMPTY && <p>No Activities yet, add one!</p>}
      {show === SHOW.SHOWED && (
        <ul className="list">
          {Object.values(exercises).map((exercise) => ( 
            <ExerciseItem key={exercise.id} exercise={exercise} /> 
          ))}
        </ul>
      )}
    </>
  );
};

export default ExerciseList;
