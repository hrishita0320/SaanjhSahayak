
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import Chatbot from './Chatbot';

function Doctor() {
    const Navigate = useNavigate();
    const [patientList, setPatientList] = useState(null);
    const handleChatbotClick = async () => {
        Navigate('/chatbot');
    };
    const handleChatbotClick1 = async () => {
        Navigate('/chat');
    };

    useEffect(() => {
        const fetchPatients = async () => {
            const response = await axios.get("http://localhost:3001/en/getpatients");
            setPatientList(response.data);
        }
        fetchPatients();
    }, []);

    const handleUpload = () => {
        Navigate('/Upload');
    }

    

    const handlePatientClick = (id) => {
        Navigate(`/doctorprofile/${id}`);
    };

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div>
            <Header />
            <div className='doctor-page'>
                <div className='action-buttons'>
                    <h2>Patients List</h2>

                    
                </div>
                <div className='patient-list'>
                    {patientList && patientList.map((patient) => (
                        <div key={patient._id} className='patient-row' onClick={() => handlePatientClick(patient._id)}>
                            <div className='patient-info1'>
                                <p><strong>ID:</strong> {patient._id}</p>
                                <p><strong>Name:</strong> {patient.name}</p>
                                <p><strong>Phone:</strong> {patient.phone}</p>
                                <p><strong>DOB:</strong> {formatDate(patient.DOB)}</p>
                                <p><strong>Gender:</strong> {patient.gender}</p>
                                <p><strong>Blood Group:</strong> {patient.bloodGroup}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <button onClick={handleChatbotClick }>Chatbot</button>
                <button onClick={handleChatbotClick1 }>ChatbotLLM</button>
            </div>
        </div>
    );
}

export default Doctor;