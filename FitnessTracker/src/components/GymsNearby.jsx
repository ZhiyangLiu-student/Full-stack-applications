import React from 'react';

const GymsNearby = ({ onBack }) => {
  const gymsInfo = [
    { name: "24 Hour Fitness", address: "2323 McKee Rd, San Jose, CA 95116" },
    { name: "Crunch Fitness", address: "375A N Capitol Ave, San Jose, CA 95133" },
    { name: "City Sports Club", address: "1045 E Brokaw Rd, San Jose, CA 95131" },
    { name: "VillaSport Athletic Club and Spa", address: "1167 N Capitol Ave, San Jose, CA 95132" }
  ];

  return (
    <div>
      <h1>Nearby Gyms</h1>
      {gymsInfo.map((gym, index) => (
        <div key={index}>
          <h2>{gym.name}</h2>
          <p>{gym.address}</p>
        </div>
      ))}
      <button onClick={onBack}>Go Back</button>
    </div>
  );
};

export default GymsNearby;
