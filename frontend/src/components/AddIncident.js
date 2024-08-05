import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff, faTrash, faEraser } from '@fortawesome/free-solid-svg-icons';
import SignatureCanvas from 'react-signature-canvas';

const AddIncident = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('response');
  const [incidentData, setIncidentData] = useState({
    station: '',
    dispatchNumber: '',
    incidentNumber: '',
    dispatchedIncidentType: '',
    actualIncidentType: '',
    psapCallDate: '',
    psapCallTime: '',
    notificationType: '',
    dispatchNotifiedDate: '',
    dispatchNotifiedTime: '',
    shift: '',
    alarms: '',
    isLocationDifferent: false,
    locationType: '',
    fireZone: '',
    propertyUse: '',
    additionalPropertyUse: '',
    hazMatReleased: false,
    isHighHazard: false,
    temperature: '',
    windSpeed: '',
    humidity: '',
    weatherType: '',
    peopleInvolved: [],
    initialCommandDate: '',
    initialCommandTime: '',
    commandUnit: '',
    incidentCommander: '',
    commandNotes: '',
    commandTransferred: false,
    sizeUpCompleted: false,
    operationsEngaged: false,
    controlledDate: '',
    controlledTime: '',
    parComplete: false,
    structureType: '',
    preIncidentPropertyValue: '',
    preIncidentContentsValue: '',
    propertyLoss: false,
    contentsLoss: false,
    significantMaterials: false,
    vehicles: [],
    equipment: [],
    nfirsNarrative: '',
    signatures: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncidentData({ ...incidentData, [name]: value });
  };

  const handleToggleChange = (field) => {
    setIncidentData((prevData) => ({
      ...prevData,
      [field]: !prevData[field],
    }));
  };

  const handleNowButton = (fieldPrefix) => {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0].slice(0, 5);
    setIncidentData((prevData) => ({
      ...prevData,
      [`${fieldPrefix}Date`]: formattedDate,
      [`${fieldPrefix}Time`]: formattedTime,
    }));
  };

  const handleAddPerson = () => {
    setIncidentData((prevData) => ({
      ...prevData,
      peopleInvolved: [...prevData.peopleInvolved, { firstName: '', lastName: '' }],
    }));
  };

  const handleRemovePerson = (index) => {
    setIncidentData((prevData) => ({
      ...prevData,
      peopleInvolved: prevData.peopleInvolved.filter((_, i) => i !== index),
    }));
  };

  const handlePersonChange = (index, field, value) => {
    const updatedPeople = incidentData.peopleInvolved.map((person, i) => (
      i === index ? { ...person, [field]: value } : person
    ));
    setIncidentData({ ...incidentData, peopleInvolved: updatedPeople });
  };

  const handleAddVehicle = () => {
    setIncidentData((prevData) => ({
      ...prevData,
      vehicles: [...prevData.vehicles, { year: '', make: '', model: '', color: '' }],
    }));
  };

  const handleRemoveVehicle = (index) => {
    setIncidentData((prevData) => ({
      ...prevData,
      vehicles: prevData.vehicles.filter((_, i) => i !== index),
    }));
  };

  const handleVehicleChange = (index, field, value) => {
    const updatedVehicles = incidentData.vehicles.map((vehicle, i) => (
      i === index ? { ...vehicle, [field]: value } : vehicle
    ));
    setIncidentData({ ...incidentData, vehicles: updatedVehicles });
  };

  const handleAddEquipment = () => {
    setIncidentData((prevData) => ({
      ...prevData,
      equipment: [...prevData.equipment, ''],
    }));
  };

  const handleRemoveEquipment = (index) => {
    setIncidentData((prevData) => ({
      ...prevData,
      equipment: prevData.equipment.filter((_, i) => i !== index),
    }));
  };

  const handleEquipmentChange = (index, value) => {
    const updatedEquipment = incidentData.equipment.map((item, i) => (
      i === index ? value : item
    ));
    setIncidentData({ ...incidentData, equipment: updatedEquipment });
  };

  const handleAddSignature = () => {
    setIncidentData((prevData) => ({
      ...prevData,
      signatures: [...prevData.signatures, { name: '', signatureData: null }],
    }));
  };

  const handleRemoveSignature = (index) => {
    setIncidentData((prevData) => ({
      ...prevData,
      signatures: prevData.signatures.filter((_, i) => i !== index),
    }));
  };

  const handleSignatureNameChange = (index, value) => {
    const updatedSignatures = incidentData.signatures.map((sig, i) => (
      i === index ? { ...sig, name: value } : sig
    ));
    setIncidentData({ ...incidentData, signatures: updatedSignatures });
  };

  const handleSignatureDraw = (index, ref) => {
    const updatedSignatures = incidentData.signatures.map((sig, i) => (
      i === index ? { ...sig, signatureData: ref.toDataURL() } : sig
    ));
    setIncidentData({ ...incidentData, signatures: updatedSignatures });
  };

  const handleClearSignature = (ref) => {
    ref.clear();
  };

  const handleSaveDraft = () => {
    // Logic to save the incident as a draft
    console.log('Save as Draft', incidentData);
  };

  const handleComplete = () => {
    // Logic to complete the incident report
    console.log('Complete Incident Report', incidentData);
  };

  const handleClose = () => {
    // Logic to close the incident report
    console.log('Close Incident Report');
    onClose();
  };

  return (
    <div className="add-incident">
      <div className="add-incident-header">
        <h2>Incident Reporting</h2>
        <div className="add-incident-buttons">
          <button onClick={handleSaveDraft}>Save as Draft</button>
          <button onClick={handleComplete}>Complete</button>
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
      <div className="add-incident-content">
        <div className="sidebar">
          <button
            className={activeTab === 'response' ? 'active' : ''}
            onClick={() => setActiveTab('response')}
          >
            Response
          </button>
          <button
            className={activeTab === 'sizeup' ? 'active' : ''}
            onClick={() => setActiveTab('sizeup')}
          >
            Size-up
          </button>
          <button
            className={activeTab === 'operations' ? 'active' : ''}
            onClick={() => setActiveTab('operations')}
          >
            Operations
          </button>
          <button
            className={activeTab === 'information' ? 'active' : ''}
            onClick={() => setActiveTab('information')}
          >
            Information
          </button>
          <button
            className={activeTab === 'wrapup' ? 'active' : ''}
            onClick={() => setActiveTab('wrapup')}
          >
            Wrap-up
          </button>
        </div>
        <div className="main-content">
          {activeTab === 'response' && (
            <div>
              {/* Response Tab Content */}
              <h3>Dispatch</h3>
              {/* Dispatch Form Fields */}
              <div className="form-group">
                <label>Station:</label>
                <select
                  name="station"
                  value={incidentData.station}
                  onChange={handleInputChange}
                >
                  <option value="">Select Station</option>
                  <option value="station1">Station 1</option>
                  <option value="station2">Station 2</option>
                </select>
              </div>
              <div className="form-group">
                <label>Dispatch Number:</label>
                <input
                  type="text"
                  name="dispatchNumber"
                  value={incidentData.dispatchNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Incident Number:</label>
                <input
                  type="text"
                  name="incidentNumber"
                  value={incidentData.incidentNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Dispatched Incident Type:</label>
                <select
                  name="dispatchedIncidentType"
                  value={incidentData.dispatchedIncidentType}
                  onChange={handleInputChange}
                >
                  <option value="">Select Type</option>
                  <option value="fire">Fire</option>
                  <option value="medical">Medical</option>
                </select>
              </div>
              <div className="form-group">
                <label>Actual Incident Type:</label>
                <select
                  name="actualIncidentType"
                  value={incidentData.actualIncidentType}
                  onChange={handleInputChange}
                >
                  <option value="">Select Type</option>
                  <option value="fire">Fire</option>
                  <option value="medical">Medical</option>
                </select>
              </div>
              <div className="form-group">
                <label>PSAP Call Date:</label>
                <input
                  type="date"
                  name="psapCallDate"
                  value={incidentData.psapCallDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>PSAP Call Time:</label>
                <input
                  type="time"
                  name="psapCallTime"
                  value={incidentData.psapCallTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Notification Type:</label>
                <select
                  name="notificationType"
                  value={incidentData.notificationType}
                  onChange={handleInputChange}
                >
                  <option value="">Select Notification Type</option>
                  <option value="911">911 Call</option>
                  <option value="manual">Manual</option>
                </select>
              </div>
              <div className="form-group">
                <label>Dispatch Notified Date:</label>
                <input
                  type="date"
                  name="dispatchNotifiedDate"
                  value={incidentData.dispatchNotifiedDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Dispatch Notified Time:</label>
                <input
                  type="time"
                  name="dispatchNotifiedTime"
                  value={incidentData.dispatchNotifiedTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Shift:</label>
                <select
                  name="shift"
                  value={incidentData.shift}
                  onChange={handleInputChange}
                >
                  <option value="">Select Shift</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
              <div className="form-group">
                <label>Alarms:</label>
                <select
                  name="alarms"
                  value={incidentData.alarms}
                  onChange={handleInputChange}
                >
                  <option value="">Select Alarms</option>
                  <option value="single">Single Alarm</option>
                  <option value="multiple">Multiple Alarms</option>
                </select>
              </div>

              {/* Location Section */}
              <h3>Location</h3>
              <div className="form-group">
                <label>
                  Is Incident Location different than Dispatched Location:
                </label>
                <button
                  className="toggle-button"
                  onClick={() => handleToggleChange('isLocationDifferent')}
                >
                  <FontAwesomeIcon
                    icon={
                      incidentData.isLocationDifferent ? faToggleOn : faToggleOff
                    }
                  />
                </button>
              </div>
              <div className="form-group">
                <label>Location Type:</label>
                <select
                  name="locationType"
                  value={incidentData.locationType}
                  onChange={handleInputChange}
                >
                  <option value="">Select Location Type</option>
                  <option value="streetAddress">Street Address</option>
                  <option value="intersection">Intersection</option>
                </select>
              </div>
              <div className="form-group">
                <label>Fire Zone:</label>
                <select
                  name="fireZone"
                  value={incidentData.fireZone}
                  onChange={handleInputChange}
                >
                  <option value="">Select Fire Zone</option>
                  <option value="zone1">Zone 1</option>
                  <option value="zone2">Zone 2</option>
                </select>
              </div>

              {/* Placeholder for Other Sections */}
              <h3>Resources</h3>
              <div>Resources Content</div>

              <h3>Station Response</h3>
              <div>Station Response Content</div>
            </div>
          )}
          {activeTab === 'sizeup' && (
            <div>
              {/* Size-up Tab Content */}
              <h3>Scene</h3>
              <div className="form-group">
                <label>Property Use where Incident Occurred:</label>
                <select
                  name="propertyUse"
                  value={incidentData.propertyUse}
                  onChange={handleInputChange}
                >
                  <option value="">Select Property Use</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <div className="form-group">
                <label>Additional Property Use(s) at Location?:</label>
                <select
                  name="additionalPropertyUse"
                  value={incidentData.additionalPropertyUse}
                  onChange={handleInputChange}
                >
                  <option value="">Select Additional Property Use</option>
                  <option value="parking">Parking</option>
                  <option value="storage">Storage</option>
                </select>
              </div>
              <div className="form-group">
                <label>HazMat Released:</label>
                <select
                  name="hazMatReleased"
                  value={incidentData.hazMatReleased}
                  onChange={handleInputChange}
                >
                  <option value="">Select Option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="form-group">
                <label>High Hazard IBC Classification:</label>
                <button
                  className="toggle-button"
                  onClick={() => handleToggleChange('isHighHazard')}
                >
                  <FontAwesomeIcon
                    icon={incidentData.isHighHazard ? faToggleOn : faToggleOff}
                  />
                </button>
              </div>

              <h3>Weather</h3>
              <div className="form-group">
                <label>Temperature (°F):</label>
                <input
                  type="number"
                  name="temperature"
                  value={incidentData.temperature}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Wind Speed (mph):</label>
                <input
                  type="number"
                  name="windSpeed"
                  value={incidentData.windSpeed}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Humidity (%):</label>
                <input
                  type="number"
                  name="humidity"
                  value={incidentData.humidity}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                />
              </div>
              <div className="form-group">
                <label>Weather Type:</label>
                <select
                  name="weatherType"
                  value={incidentData.weatherType}
                  onChange={handleInputChange}
                >
                  <option value="">Select Weather Type</option>
                  <option value="clear">Clear</option>
                  <option value="rain">Rain</option>
                  <option value="snow">Snow</option>
                </select>
              </div>

              <h3>People Involved</h3>
              <div className="people-involved">
                {incidentData.peopleInvolved.map((person, index) => (
                  <div key={index} className="person">
                    <div className="form-group">
                      <label>First Name:</label>
                      <input
                        type="text"
                        value={person.firstName}
                        onChange={(e) => handlePersonChange(index, 'firstName', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name:</label>
                      <input
                        type="text"
                        value={person.lastName}
                        onChange={(e) => handlePersonChange(index, 'lastName', e.target.value)}
                      />
                    </div>
                    <button onClick={() => handleRemovePerson(index)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
                <button onClick={handleAddPerson}>Add Person</button>
              </div>
            </div>
          )}
          {activeTab === 'operations' && (
            <div>
              {/* Operations Tab Content */}
              <h3>Command & Safety</h3>
              <div className="form-group">
                <button onClick={() => handleNowButton('initialCommand')}>Now</button>
                <label>Date:</label>
                <input
                  type="date"
                  name="initialCommandDate"
                  value={incidentData.initialCommandDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Time:</label>
                <input
                  type="time"
                  name="initialCommandTime"
                  value={incidentData.initialCommandTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Unit:</label>
                <select
                  name="commandUnit"
                  value={incidentData.commandUnit}
                  onChange={handleInputChange}
                >
                  <option value="">Select Unit</option>
                  <option value="unit1">Unit 1</option>
                  <option value="unit2">Unit 2</option>
                </select>
              </div>
              <div className="form-group">
                <label>Incident Commander:</label>
                <select
                  name="incidentCommander"
                  value={incidentData.incidentCommander}
                  onChange={handleInputChange}
                >
                  <option value="">Select Commander</option>
                  <option value="commander1">Commander 1</option>
                  <option value="commander2">Commander 2</option>
                </select>
              </div>
              <div className="form-group">
                <label>Notes:</label>
                <textarea
                  name="commandNotes"
                  value={incidentData.commandNotes}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Command Transferred?</label>
                <button
                  className="toggle-button"
                  onClick={() => handleToggleChange('commandTransferred')}
                >
                  <FontAwesomeIcon
                    icon={incidentData.commandTransferred ? faToggleOn : faToggleOff}
                  />
                </button>
              </div>
              <div className="form-group">
                <label>360 Degrees Size-up Completed?</label>
                <button
                  className="toggle-button"
                  onClick={() => handleToggleChange('sizeUpCompleted')}
                >
                  <FontAwesomeIcon
                    icon={incidentData.sizeUpCompleted ? faToggleOn : faToggleOff}
                  />
                </button>
              </div>
              <div className="form-group">
                <label>Operations Section Engaged?</label>
                <button
                  className="toggle-button"
                  onClick={() => handleToggleChange('operationsEngaged')}
                >
                  <FontAwesomeIcon
                    icon={incidentData.operationsEngaged ? faToggleOn : faToggleOff}
                  />
                </button>
              </div>

              <h3>Controlled</h3>
              <div className="form-group">
                <button onClick={() => handleNowButton('controlled')}>Now</button>
                <label>Date:</label>
                <input
                  type="date"
                  name="controlledDate"
                  value={incidentData.controlledDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Time:</label>
                <input
                  type="time"
                  name="controlledTime"
                  value={incidentData.controlledTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>PAR Complete?</label>
                <button
                  className="toggle-button"
                  onClick={() => handleToggleChange('parComplete')}
                >
                  <FontAwesomeIcon
                    icon={incidentData.parComplete ? faToggleOn : faToggleOff}
                  />
                </button>
              </div>
            </div>
          )}
          {activeTab === 'information' && (
            <div>
              {/* Information Tab Content */}
              <h3>Property Details</h3>
              <div className="form-group">
                <label>Structure Type:</label>
                <select
                  name="structureType"
                  value={incidentData.structureType}
                  onChange={handleInputChange}
                >
                  <option value="">Select Structure Type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>
              <div className="form-group">
                <label>Pre-Incident Property Value:</label>
                <input
                  type="number"
                  name="preIncidentPropertyValue"
                  value={incidentData.preIncidentPropertyValue}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Pre-Incident Contents Value:</label>
                <input
                  type="number"
                  name="preIncidentContentsValue"
                  value={incidentData.preIncidentContentsValue}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Property Loss?</label>
                <button
                  className="toggle-button"
                  onClick={() => handleToggleChange('propertyLoss')}
                >
                  <FontAwesomeIcon
                    icon={incidentData.propertyLoss ? faToggleOn : faToggleOff}
                  />
                </button>
              </div>
              <div className="form-group">
                <label>Contents Loss?</label>
                <button
                  className="toggle-button"
                  onClick={() => handleToggleChange('contentsLoss')}
                >
                  <FontAwesomeIcon
                    icon={incidentData.contentsLoss ? faToggleOn : faToggleOff}
                  />
                </button>
              </div>
              <div className="form-group">
                <label>
                  Significant Commercial, Industrial, Energy or Agricultural
                  Materials?
                </label>
                <button
                  className="toggle-button"
                  onClick={() => handleToggleChange('significantMaterials')}
                >
                  <FontAwesomeIcon
                    icon={incidentData.significantMaterials ? faToggleOn : faToggleOff}
                  />
                </button>
              </div>

              <h3>Vehicles</h3>
              <div className="vehicles">
                {incidentData.vehicles.map((vehicle, index) => (
                  <div key={index} className="vehicle">
                    <div className="form-group">
                      <label>Year:</label>
                      <input
                        type="number"
                        value={vehicle.year}
                        onChange={(e) =>
                          handleVehicleChange(index, 'year', e.target.value)
                        }
                        min="1900"
                        max={new Date().getFullYear()}
                      />
                    </div>
                    <div className="form-group">
                      <label>Make:</label>
                      <input
                        type="text"
                        value={vehicle.make}
                        onChange={(e) =>
                          handleVehicleChange(index, 'make', e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Model:</label>
                      <input
                        type="text"
                        value={vehicle.model}
                        onChange={(e) =>
                          handleVehicleChange(index, 'model', e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Color:</label>
                      <input
                        type="text"
                        value={vehicle.color}
                        onChange={(e) =>
                          handleVehicleChange(index, 'color', e.target.value)
                        }
                      />
                    </div>
                    <button onClick={() => handleRemoveVehicle(index)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
                <button onClick={handleAddVehicle}>Add Vehicle</button>
              </div>

              <h3>Equipment</h3>
              <div className="equipment">
                {incidentData.equipment.map((item, index) => (
                  <div key={index} className="equipment-item">
                    <div className="form-group">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleEquipmentChange(index, e.target.value)}
                      />
                    </div>
                    <button onClick={() => handleRemoveEquipment(index)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
                <button onClick={handleAddEquipment}>Add Equipment</button>
              </div>
            </div>
          )}
          {activeTab === 'wrapup' && (
            <div>
              {/* Wrap-up Tab Content */}
              <h3>Narratives</h3>
              <div className="form-group">
                <label>Department NFIRS Narrative:</label>
                <textarea
                  name="nfirsNarrative"
                  value={incidentData.nfirsNarrative}
                  onChange={handleInputChange}
                  rows="5"
                />
              </div>

              <h3>Signatures</h3>
              <div className="signatures">
                {incidentData.signatures.map((signature, index) => (
                  <div key={index} className="signature">
                    <div className="form-group">
                      <label>Type Name:</label>
                      <input
                        type="text"
                        value={signature.name}
                        onChange={(e) => handleSignatureNameChange(index, e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Signature:</label>
                      <SignatureCanvas
                        penColor="black"
                        canvasProps={{
                          width: 200,
                          height: 100,
                          className: 'signature-canvas'
                        }}
                        ref={(ref) => {
                          if (ref) {
                            signature.signatureData = ref;
                          }
                        }}
                        onEnd={() => handleSignatureDraw(index, signature.signatureData)}
                      />
                      <button onClick={() => handleClearSignature(signature.signatureData)}>
                        <FontAwesomeIcon icon={faEraser} />
                      </button>
                      <button onClick={() => handleRemoveSignature(index)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                ))}
                <button onClick={handleAddSignature}>Add Signature</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddIncident;
