import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';


export default function Upload() {
  const [currentChronic, setCurrentChronic] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    phoneNumber: '',
    chronics: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAddChronic = () => {
    if (currentChronic.trim() !== '') {
      setFormData(prevData => ({
        ...prevData,
        chronics: [...prevData.chronics, currentChronic.trim()]
      }));
      setCurrentChronic('');
    }
  };

  const handleRemoveChronic = (index) => {
    setFormData(prevData => ({
      ...prevData,
      chronics: prevData.chronics.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Create a new object with the date properly formatted
    const formDataToSend = {
      ...formData,
      dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString() : null
    };
    
    const response = await axios.post('http://localhost:3001/en/setPatient', formDataToSend);
    console.log(response.data.data);
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      gender: '',
      bloodGroup: '',
      phoneNumber: '',
      chronics : [],
    });
    alert('Form data submitted successfully!');
    navigate(-1);
  };

  return (
    <div>
        <Header/>
    <div className="patient-form-container">
    
      <h1>Add a New Patient</h1>
      <form onSubmit={handleSubmit} className="patient-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="bloodGroup">Blood Group</label>
          <input
            type="text"
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="chronic">Chronic Conditions</label>
          <div className="chronic-input">
            <input
              type="text"
              id="chronic"
              value={currentChronic}
              onChange={(e) => setCurrentChronic(e.target.value)}
            />
            <button type="button" onClick={handleAddChronic}>Add</button>
          </div>
          <ul className="chronic-list">
            {formData.chronics.map((chronic, index) => (
              <li key={index}>
                {chronic}
                <button type="button" onClick={() => handleRemoveChronic(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="form-actions">
          <button type="button" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit">Create Patient</button>
        </div>
      </form>
    </div>
    </div>
  );
}