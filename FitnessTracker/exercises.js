const uuid = require('uuid').v4;

function calculateCalories(activityType, duration, weight) {
  const baseCaloriesPerMinute = {
    'Running': 0.95,
    'Swimming': 0.12,
    'Cycling': 0.08,
    'Basketball': 0.1,
  };

  const rate = baseCaloriesPerMinute[activityType] || (0.05 + Math.random() * 0.05);
  return (rate * duration * weight).toFixed(2);
}

function makeWorkoutsList(weight) {
  const workouts = {};

  function addWorkout({ activityType, duration }) {
    const id = uuid();
    const caloriesBurned = calculateCalories(activityType, duration, weight);
    workouts[id] = {
      id,
      activityType,
      duration,
      caloriesBurned,
    };
    return id;
  }

  return {
    addWorkout,
    getWorkout: (id) => workouts[id],
    getWorkouts: () => Object.values(workouts),
    deleteWorkout: (id) => { delete workouts[id]; },
    contains: (id) => id in workouts 
  };
}

module.exports = { makeWorkoutsList };

