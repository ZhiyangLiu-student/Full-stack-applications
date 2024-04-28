import React, { useState, useContext, useEffect } from 'react';
import Header from './components/Header';
import AddExercise from './components/AddExercise';
import Controls from './components/Controls';
import LoginForm from './components/LoginForm';
import PollingPart from './components/PollingPart';
import GymsNearby from './components/GymsNearby';
import { LOGIN_STATUS } from './utils/constants';
import { GlobalContext } from './context/GlobalState';
import Status from './components/Status';
import './App.css';

function App() {
  const { error, loginStatus } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    if (loginStatus === LOGIN_STATUS.IS_LOGGED_IN) {
      setCurrentPage('home');
    }
  }, [loginStatus]);

  return (
    <>
      {error && <Status />}
      <Header />
      {loginStatus === LOGIN_STATUS.PENDING && <Loading />}
      {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm />}
      {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
        <>
          {currentPage === 'home' && (
            <div className="container">
              <PollingPart />
              <AddExercise />
              <Controls />
              <button onClick={() => setCurrentPage('gyms')}>View Nearby Gyms</button>
            </div>
          )}
          {currentPage === 'gyms' && <GymsNearby onBack={() => setCurrentPage('home')} />}
        </>
      )}
    </>
  );
}

export default App;


