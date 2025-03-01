import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

export default function AnalysisDoctor() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [doctorNotes, setDoctorNotes] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const getReportDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/en/getreportdetails?id=${id}`);
        setPatient(response.data);
        setDoctorNotes(response.data.doctorNotes || '');
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching report details:', error);
        setIsLoading(false);
      }
    };

    getReportDetails();
  }, [id]);

  const handlePDFView = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/en/files/${patient.file}`, { responseType: 'arraybuffer' });
      if (response.headers['content-type'] !== 'application/pdf') {
        throw new Error('Response is not a PDF file');
      }
      const binaryData = new Uint8Array(response.data);
      const blob = new Blob([binaryData], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error("Error fetching PDF file:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.post(`http://localhost:3001/en/updateDoctorNotes/${id}`, { doctorNotes });
      setIsEditing(false);
      alert("Doctor notes updated successfully.");
    } catch (error) {
      console.error('Error updating doctor notes:', error);
    }
  };

  const handleCancel = () => {
    setDoctorNotes(patient.doctorNotes || '');
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setDoctorNotes(e.target.value);
  };

  if (isLoading) {
    return <div className="loading">Loading report details...</div>;
  }
  const handleBack = () => {
    navigate(-1);
};

  return (
    <div className="analysis">
      <Header />
      <div className="analysis-container">
        <div className="analysis-headers">
          <h1>Report Details</h1>
          <button onClick={handleBack} className="back-button">Back</button>
        </div>
        
        {patient ? (
          <main className="analysis-main">
            <section className="report-info card">
              <h2>Patient Information</h2>
              <div className="info-grid">
                <div className="info-item"><strong>ID:</strong> {patient._id}</div>
                <div className="info-item"><strong>Date of Report:</strong> {patient.dateOfReport ? new Date(patient.dateOfReport).toLocaleDateString() : 'N/A'}</div>
                <div className="info-item"><strong>Patient:</strong> {patient.patient}</div>
                <div className="info-item"><strong>Severity:</strong> {patient.severity}</div>
                <div className="info-item full-width"><strong>Specialist Required:</strong> {patient.specialistReq}</div>
              </div>
            </section>

            <section className="report-summary card">
              <h2>Summary</h2>
              <p>{patient.summary}</p>
            </section>

            <div className="two-column">
              <section className="report-precautions card">
                <h2>Precautions</h2>
                <ul>
                  {patient.precautions.map((precaution, index) => (
                    <li key={index}>{precaution}</li>
                  ))}
                </ul>
              </section>

              <section className="report-diseases card">
                <h2>Possible Diseases</h2>
                <ul>
                  {patient.possibleDiseases.map((disease, index) => (
                    <li key={index}>{disease}</li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="report-notes card">
              <h2>Doctor's Notes</h2>
              {isEditing ? (
                <textarea
                  value={doctorNotes}
                  onChange={handleChange}
                  style={{ width: '100%', minHeight: '100px', borderRadius: '5px', padding: '5px' }}
                />
              ) : (
                <p>{doctorNotes}</p>
              )}
            </section>

            <div className="report-actions">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="action-button">Save</button>
                  <button onClick={handleCancel} className="action-button">Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={handleEdit} className="action-button">Edit Doctor's Notes</button>
                  <button onClick={handlePDFView} className="action-button">View Report</button>
                </>
              )}
            </div>
          </main>
        ) : (
          <p>No report details found.</p>
        )}
      </div>
    </div>
  );
}