const sessions = require('./sessions.js');
const users = require('./users.js');
const exercises = require('./exercises.js');

const getSessions = (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    return null;
  }
  return username;
}

const checkSessionsService = (req, res) => {
  const username = getSessions(req, res);
  if (!username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
}

const loginService = (req, res) => {
  const { username } = req.body;

  if (!users.isValid(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }
  if (username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);
  const userWeight = existingUserData ? existingUserData.weight : 70;

  if (!existingUserData) {
    users.addUserData(username, exercises.makeWorkoutsList(userWeight));
  }

  res.cookie('sid', sid);
  const exercisesList = users.getUserData(username);
  const list = exercisesList.getWorkouts();

  res.json(list);
}

const logoutService = (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (sid) {
    res.clearCookie('sid');
  }

  if (username) {
    sessions.deleteSession(sid);
  }

  res.json({ username });
}

const getExercisesService = (req, res) => {
  const username = getSessions(req, res);
  if (!username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  res.json(users.getUserData(username).getWorkouts());
}

const addExerciseService = (req, res) => {
  const username = getSessions(req, res);
  if (!username) {
    return res.status(401).json({ error: 'auth-missing' });
  }

  const { activityType, duration, userWeight } = req.body;

  if (!activityType) {
    return res.status(400).json({ error: 'Activity type is required' });
  }
  if (typeof duration !== 'number') {
    return res.status(400).json({ error: 'Duration must be a number' });
  }
  if (userWeight <= 0) {
    return res.status(400).json({ error: 'Invalid number' });
  }

  const exercisesList = users.getUserData(username);
  const id = exercisesList.addWorkout({ activityType, duration, userWeight });
  res.json(exercisesList.getWorkout(id));
};

const deleteExerciseService = (req, res) => {
  const username = getSessions(req, res);
  if (!username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { id } = req.params;
  const exerciseList = users.getUserData(username);
  const exists = exerciseList.contains(id);
  if (exists) {
    exerciseList.deleteWorkout(id);
  }
  res.json({ message: exists ? `exercise ${id} deleted` : `exercise ${id} did not exist` });
}

module.exports = {
  getSessions,
  checkSessionsService,
  loginService,
  logoutService,
  getExercisesService,
  addExerciseService,
  deleteExerciseService
}