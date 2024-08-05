import React from 'react';
import './App.css';
import IncidentList from './components/IncidentList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Fire Incident Reporting System</h1>
      </header>
      <main>
        <IncidentList />
      </main>
    </div>
  );
}

export default App;
