import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    // Fetch incidents from the backend
    axios.get('http://127.0.0.1:5000/incidents')
      .then(response => {
        setIncidents(response.data);
      })
      .catch(error => {
        console.error('Error fetching incidents:', error);
      });
  }, []);

  return (
    <div>
      <h1>Statewide Fire Incident Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Location</th>
            <th>Date</th>
            <th>Description</th>
            <th>Agency ID</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr key={incident.id}>
              <td>{incident.location}</td>
              <td>{incident.date}</td>
              <td>{incident.description}</td>
              <td>{incident.agency_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
