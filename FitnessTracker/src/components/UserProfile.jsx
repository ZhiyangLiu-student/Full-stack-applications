import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';

const UserProfile = () => {
  const { userWeight, updateUserWeight } = useContext(GlobalContext);
  const [weight, setWeight] = useState(userWeight || '');

  const handleWeightChange = (event) => setWeight(event.target.value);
  const handleWeightSubmit = (event) => {
    event.preventDefault();
    updateUserWeight(parseFloat(weight));
  };

  return (
    <form onSubmit={handleWeightSubmit}>
      <input
        type="number"
        value={weight}
        onChange={handleWeightChange}
        placeholder="Weight in kg"
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default UserProfile;
