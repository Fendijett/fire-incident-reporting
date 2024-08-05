import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import AddIncident from './AddIncident';

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [filters, setFilters] = useState({
    incidentNumber: '',
    fromDate: '',
    toDate: '',
    location: '',
    dispatchType: '',
    firstArriving: '',
    shift: '',
    status: '',
    visibleColumns: {
      incidentNumber: true,
      incidentDate: true,
      incidentLocation: true,
      dispatchType: true,
      firstArriving: true,
      shift: true,
      officerInCharge: true,
      lastOpenedBy: true,
      status: true,
      actions: true,
    },
    sortLimit: '20',
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddingIncident, setIsAddingIncident] = useState(false);

  // Fetch incidents from the backend
  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/incidents');
      setIncidents(response.data);
    } catch (error) {
      console.error('Error fetching incidents:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleColumnVisibilityChange = (column) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      visibleColumns: {
        ...prevFilters.visibleColumns,
        [column]: !prevFilters.visibleColumns[column],
      },
    }));
  };

  const handleSearch = () => {
    // Logic to filter incidents based on search criteria
    console.log('Search with filters:', filters);
  };

  const handleReset = () => {
    setFilters({
      incidentNumber: '',
      fromDate: '',
      toDate: '',
      location: '',
      dispatchType: '',
      firstArriving: '',
      shift: '',
      status: '',
      visibleColumns: {
        incidentNumber: true,
        incidentDate: true,
        incidentLocation: true,
        dispatchType: true,
        firstArriving: true,
        shift: true,
        officerInCharge: true,
        lastOpenedBy: true,
        status: true,
        actions: true,
      },
      sortLimit: '20',
    });
    fetchIncidents();
  };

  const handleAddIncident = () => {
    setIsAddingIncident(true);
  };

  const handleExport = () => {
    // Logic to export incident list
    console.log('Export incident list');
  };

  const handleEditIncident = (id) => {
    // Logic to edit an incident
    console.log('Edit incident:', id);
  };

  const handleDeleteIncident = (id) => {
    // Logic to delete an incident
    console.log('Delete incident:', id);
  };

  return (
    <div className="incident-list">
      {!isAddingIncident ? (
        <>
          <h2>Incident List</h2>
          <div className="filter-bar">
            <input
              type="text"
              name="incidentNumber"
              placeholder="Incident #"
              value={filters.incidentNumber}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="fromDate"
              value={filters.fromDate}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="toDate"
              value={filters.toDate}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={filters.location}
              onChange={handleInputChange}
            />
            <select name="dispatchType" value={filters.dispatchType} onChange={handleInputChange}>
              <option value="">Dispatch Type</option>
              <option value="type1">Type 1</option>
              <option value="type2">Type 2</option>
            </select>
            <select name="firstArriving" value={filters.firstArriving} onChange={handleInputChange}>
              <option value="">1st Arriving</option>
              <option value="unit1">Unit 1</option>
              <option value="unit2">Unit 2</option>
            </select>
            <select name="shift" value={filters.shift} onChange={handleInputChange}>
              <option value="">Shift</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
            <select name="status" value={filters.status} onChange={handleInputChange}>
              <option value="">Status</option>
              <option value="authorized">Authorized</option>
              <option value="not started">Not Started</option>
              <option value="incomplete">Incomplete</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
            
            {/* Column Visibility Dropdown */}
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Select Columns
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  {Object.keys(filters.visibleColumns).map((column) => (
                    <div key={column} className="dropdown-item">
                      <label>
                        <input
                          type="checkbox"
                          checked={filters.visibleColumns[column]}
                          onChange={() => handleColumnVisibilityChange(column)}
                        />
                        {column.charAt(0).toUpperCase() + column.slice(1).replace(/([A-Z])/g, ' $1')}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button onClick={handleSearch}>Search</button>
            <button onClick={handleReset}>Reset All Fields</button>
          </div>
          <div className="action-bar">
            <button onClick={handleAddIncident}>Add New Incident</button>
            <button onClick={handleExport}>Export Incident List</button>
            <select name="sortLimit" value={filters.sortLimit} onChange={handleInputChange}>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="all">All</option>
            </select>
          </div>
          <table>
            <thead>
              <tr>
                {filters.visibleColumns.incidentNumber && <th>Incident #</th>}
                {filters.visibleColumns.incidentDate && <th>Incident Date/Time</th>}
                {filters.visibleColumns.incidentLocation && <th>Incident Location</th>}
                {filters.visibleColumns.dispatchType && <th>Dispatch Type</th>}
                {filters.visibleColumns.firstArriving && <th>1st Arriving</th>}
                {filters.visibleColumns.shift && <th>Shift</th>}
                {filters.visibleColumns.officerInCharge && <th>Officer in Charge</th>}
                {filters.visibleColumns.lastOpenedBy && <th>Last Opened by</th>}
                {filters.visibleColumns.status && <th>Status</th>}
                {filters.visibleColumns.actions && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {incidents.map((incident) => (
                <tr key={incident.id}>
                  {filters.visibleColumns.incidentNumber && <td>{incident.id}</td>}
                  {filters.visibleColumns.incidentDate && <td>{incident.date}</td>}
                  {filters.visibleColumns.incidentLocation && <td>{incident.location}</td>}
                  {filters.visibleColumns.dispatchType && <td>{incident.dispatchType || 'N/A'}</td>}
                  {filters.visibleColumns.firstArriving && <td>{incident.firstArriving || 'N/A'}</td>}
                  {filters.visibleColumns.shift && <td>{incident.shift || 'N/A'}</td>}
                  {filters.visibleColumns.officerInCharge && <td>{incident.officerInCharge || 'N/A'}</td>}
                  {filters.visibleColumns.lastOpenedBy && <td>{incident.lastOpenedBy || 'N/A'}</td>}
                  {filters.visibleColumns.status && <td>{incident.status || 'N/A'}</td>}
                  {filters.visibleColumns.actions && (
                    <td>
                      <button onClick={() => handleEditIncident(incident.id)}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </button>
                      <button onClick={() => handleDeleteIncident(incident.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <AddIncident onClose={() => setIsAddingIncident(false)} />
      )}
    </div>
  );
};

export default IncidentList;
