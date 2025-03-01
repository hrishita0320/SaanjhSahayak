import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
// import './DoctorProfile.css'; // We'll create this CSS file

export default function DoctorProfile() {
    const [patientData, setPatientData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPatientData() {
            try {
                const response = await axios.get(`http://localhost:3001/en/getpatient/${id}`);
                setPatientData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching patient data:', error);
                setIsLoading(false);
            }
        }

        fetchPatientData();
    }, [id]);

    const handleFileClick = (file) => {
        navigate(`/reportdoctor/${file}`);
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (isLoading) {
        return <div className="loading">Loading patient details...</div>;
    }

    return (
        <div className="doctor-profile">
            <Header />
            <div className="profile-container">
                <div className="profile-headers">
                    <h1>Patient Details</h1>
                    <button onClick={handleBack} className="back-button">Back</button>
                </div>
                
                <main className="profile-main">
                    <section className="patient-info">
                        <h2>Patient Information</h2>
                        {patientData && (
                            <div className="info-grid">
                                <div className="info-item"><strong>ID:</strong> {patientData._id}</div>
                                <div className="info-item"><strong>Name:</strong> {patientData.name}</div>
                                <div className="info-item"><strong>Phone:</strong> {patientData.phone}</div>
                                <div className="info-item"><strong>DOB:</strong> {new Date(patientData.DOB).toLocaleDateString()}</div>
                                <div className="info-item"><strong>Gender:</strong> {patientData.gender}</div>
                                <div className="info-item"><strong>Blood Group:</strong> {patientData.bloodGroup}</div>
                                <div className="info-item full-width">
                                    <strong>Chronics:</strong> {patientData.chronics.join(', ')}
                                </div>
                            </div>
                        )}
                    </section>

                    <section className="report-history">
                        <h2>Report History</h2>
                        <div className="file-list">
                            {patientData?.reportsList && patientData.reportsList.length > 0 ? (
                                patientData.reportsList.map((file, index) => (
                                    <div key={index} className="file-item" onClick={() => handleFileClick(file)}>
                                        <i className="fas fa-file-alt"></i>
                                        <span>File ID: {file}</span>
                                    </div>
                                ))
                            ) : (
                                <p>No reports found.</p>
                            )}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}