import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Header from './Header';
// import './Analysis.css';

export default function Analysis() {
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getReportDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/en/getreportdetails?id=${id}`);
        setPatient(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching report details:', error);
        setIsLoading(false);
      }
    };

    getReportDetails();
  }, [id]);

  const generatePDF = () => {
    if (!patient) {
      console.error('Patient data is not loaded yet.');
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('SAANJH SAHAYAK', doc.internal.pageSize.width / 2, 10, { align: 'center' });
    doc.setFontSize(16);
    doc.text('Report Details', 10, 20);

    doc.setFontSize(12);
    doc.text(`ID: ${patient._id}`, 10, 35);
    doc.text(`Date of Report: ${patient.dateOfReport ? new Date(patient.dateOfReport).toLocaleDateString() : 'N/A'}`, 10, 45);
    doc.text(`Patient: ${patient.patient}`, 10, 55);

    const summaryLines = doc.splitTextToSize(patient.summary || '', doc.internal.pageSize.width - 20);
    doc.text('Summary:', 10, 65);
    summaryLines.forEach((line, index) => {
      if (index < 5) {
        doc.text(line, 15, 75 + index * 10);
      }
    });

    doc.text(`Severity: ${patient.severity}`, 10, 135);
    doc.text(`Specialist Required: ${patient.specialistReq}`, 10, 145);
    let yPos = 155;

    if (patient.precautions.length > 0) {
      doc.text('Precautions:', 10, yPos);
      yPos += 10;
      patient.precautions.forEach((precaution, index) => {
        yPos += 5;
        doc.text(`- ${precaution}`, 15, yPos + index * 10);
      });
      yPos += (patient.precautions.length * 10) + 10;
    }
  
    if (patient.doctorNotes) {
      doc.text('Doctor\'s Note:', 10, yPos);
      yPos += 10;
      const doctorNoteLines = doc.splitTextToSize(patient.doctorNotes, doc.internal.pageSize.width - 20);
      doctorNoteLines.forEach((line, index) => {
        doc.text(line, 15, yPos + index * 10);
      });
    }

    doc.save(`Report-${patient._id}.pdf`);
  };

  const handlePDFView = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/en/files/${patient.file}`, { responseType: 'arraybuffer' });
      console.log("Response received", response);
  
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

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <div className="loading">Loading report details...</div>;
  }

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
              <h2>Doctor's Note</h2>
              <p>{patient.doctorNotes}</p>
            </section>

            <div className="report-actions">
              <button onClick={generatePDF} className="action-button">Download Report</button>
              <button onClick={handlePDFView} className="action-button">View Report</button>
            </div>
          </main>
        ) : (
          <p>No report details found.</p>
        )}
      </div>
    </div>
  );
}