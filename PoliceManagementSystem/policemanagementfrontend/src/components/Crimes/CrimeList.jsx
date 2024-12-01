import React, { useState, useEffect } from "react";
import api from "../../services/api";

const CrimeList = () => {
  const [crimes, setCrimes] = useState([]);

  useEffect(() => {
    const fetchCrimes = async () => {
      const response = await api.get("/crimes");
      setCrimes(response.data);
    };
    fetchCrimes();
  }, []);

  return (
    <div>
      <h1>Crime List</h1>
      <ul>
        {crimes.map((crime) => (
          <li key={crime.id}>
            <strong>{crime.title}</strong>: {crime.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrimeList;
