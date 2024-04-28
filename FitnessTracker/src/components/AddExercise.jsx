import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const AddExercise = () => {
  const [activityType, setActivityType] = useState('');
  const [duration, setDuration] = useState(0);
  const { addExercise, userWeight } = useContext(GlobalContext);

const onSubmit = (e) => {
  e.preventDefault();
  if (!activityType || duration <= 0 || userWeight <= 0) {
    alert('Please fill in all fields and make sure weight is set.');
    return;
  }
  const numericDuration = Number(duration);
  if (isNaN(numericDuration)) {
    alert('Duration must be a number');
    return;
  }
  addExercise({ activityType, duration: numericDuration, userWeight });
  setActivityType('');
  setDuration(0);
};

  return (
    <form onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="activityType">Activity Type</label>
        <input
          id="activityType"
          type="text"
          value={activityType}
          onChange={(e) => setActivityType(e.target.value)}
          placeholder="Enter activity type... (e.g., Running)"
        />
      </div>
      <div className="form-control">
        <label htmlFor="duration">
          Duration (minutes)
        </label>
        <input
          id="duration"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Enter duration..."
        />
      </div>
      <button className="btn">Add Exercise</button>
    </form>
  );
};

export default AddExercise;
