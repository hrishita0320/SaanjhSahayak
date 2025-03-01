import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
// import './PatientDetails.css'; // Make sure to create this CSS file

export default function PatientDetails() {
    const [patientData, setPatientData] = useState()
    // const [patientId, setPatientId] = useState(props.id);
    const [reportsDate, setReportsDate] = useState(null)
    const [isOpen, setIsOPen] = useState(false)
    const [openResult, setOpenResult] = useState(false);
    const [isValid, setIsValid] = useState(null);

    const { id } = useParams();
    // const [file, setFile] = useState
    const handleFileClick = async (file) => {
        navigate(`/report/${file}`)
      };
    
    

    async function GetPatient() {
        console.log('inside get patient')
        const response = await axios.get(`http://localhost:3001/en/getpatient/${id}`);
        console.log(response.data)
        console.log(response.data.reportList)
        setPatientData(response.data);
    }

    async function getDates() {
        console.log("hi")
        const response = await axios.get(`http://localhost:3001/en/getdates/${id}`);
        console.log(response.data)
        setReportsDate(response.data)
    }

    useEffect(() => {
        GetPatient();
        // getDates();
    }, [id]);

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birthDateObj = new Date(birthDate);

        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }

        return age;
    };

    // const handlePatient = async (id) => {
    //     try {

    //         navigate(/doctoranalysis, { state: { id: id, pid: patientId, patientData: patientData } })


    //     }
    //     catch (error) {

    //     }
    // }

    const handleFile = async (event) => {
        setIsOPen(true);
        const selectedFile = event.target.files[0];


        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const fileData = reader.result.split(',')[1]; // Get base64-encoded file data
                const filename = event.target.value.replace("C:\\fakepath\\", "");

                try {
                    console.log("hi");
                    const reponse = await axios.post('http://localhost:3001/en/uploadpdf', { file: fileData, filename: filename, patientId: id, name: patientData.name });
                    if (reponse.data.data === false) {

                        setIsOPen(false);
                        setIsValid(true);
                        setOpenResult(true);
                    }
                    else {

                        setIsOPen(false);
                        setIsValid(false);
                        setOpenResult(true);
                    }

                } catch (error) {
                    console.log("Error uploading details:", error);
                    setIsOPen(false);
                    alert('File size too large or other issues.');
                }
            };
            reader.readAsDataURL(selectedFile);
        } else {
            console.log("No input file");
        }
    };


    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };


    return (
        <div className="patient-details">
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

                    <section className="report-upload">
                        <h2>Upload Reports</h2>
                        <label htmlFor="file-upload" className="file-upload-label">
                            Upload Reports
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFile}
                        />
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