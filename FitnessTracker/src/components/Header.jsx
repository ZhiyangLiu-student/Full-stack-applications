import React from 'react';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Header = () => {
  const { username, userWeight } = useContext(GlobalContext);

  return (
    <header>
      <h1>Exercise Tracker</h1>
      {username && (
        <>
          <div>Welcome, {username}!</div>
          {userWeight > 0 && <div>Your weight: {userWeight} kg</div>}
        </>
      )}
    </header>
  );
};

export default Header;





