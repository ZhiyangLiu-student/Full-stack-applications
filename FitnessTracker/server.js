const express = require('express');
const cookieParser = require('cookie-parser');
const services = require('./services');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

app.get('/api/sessions', services.checkSessionsService);
app.post('/api/sessions', services.loginService);
app.delete('/api/sessions', services.logoutService);

app.get('/api/exercises', services.getExercisesService); 
app.post('/api/exercises', services.addExerciseService); 
app.delete('/api/exercises/:id', services.deleteExerciseService); 

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));