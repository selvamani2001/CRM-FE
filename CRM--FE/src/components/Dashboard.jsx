import React, { useEffect, useState, useRef } from 'react';
import Navlink from './Navbar/Navbar';
import { protecdInstance } from '../services/instance';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

function Profile() {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    alternateEmail: '',
    Contact: '',
    gender: '',
    address: '',
  });

  const [editableField, setEditableField] = useState(null);
  const inputRefs = {
    name: useRef(null),
    email: useRef(null),
    alternateEmail: useRef(null),
    Contact: useRef(null),
    gender: useRef(null),
    address: useRef(null),
  };

  useEffect(() => {
    getProfileData();
  }, []);

  useEffect(() => {
    if (editableField) {
      inputRefs[editableField].current.focus();
      inputRefs[editableField].current.setSelectionRange(
        inputRefs[editableField].current.value.length,
        inputRefs[editableField].current.value.length
      );
    }
  }, [editableField]);

  const getProfileData = async () => {
    try {
      const response = await protecdInstance.get('/ticket/profile');
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await protecdInstance.post('/ticket/profile', profileData);
      console.log('Profile updated successfully');
      setEditableField(null); // Reset editable field after update
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleEdit = (fieldName) => {
    setEditableField(fieldName);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const displayedFields = ['name', 'email', 'Contact', 'gender', 'address'];

  return (
    <div>
      <Navlink />
      <div className="container mt-4">
        <h1>Profile</h1>
        <div className="row">
          <div className="col-md-6">
            {displayedFields.map((fieldName) => (
              <div key={fieldName} className="mb-3">
                <label className="form-label">{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:</label>
                <div className={`input-group ${editableField === fieldName ? 'active-input' : ''}`}>
                  <input
                    type="text"
                    className="form-control"
                    name={fieldName}
                    value={profileData[fieldName]||''}
                    onChange={handleChange}
                    readOnly={editableField !== fieldName}
                    ref={inputRefs[fieldName]}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => handleEdit(fieldName)}
                  >
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <button className="btn btn-primary " onClick={handleUpdateProfile}>Update Profile</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
