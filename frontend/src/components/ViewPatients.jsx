import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import Navigationvar from './Navigationvar';

// export default function ViewPatient() {
//     const { id } = useParams();
//     const [file, setFile] = useState("");
//     const [patientDetails, setPatientDetails] = useState(null);
//     const [fileName,setFileName]=useState("");
//     const [size,setSize]=useState(0);

//     useEffect(() => {
//         const fetchPatientDetails = async () => {
//             try {
//                 const res = await axios.get(`/en/patientdetail?id=${id}`);
//                 setPatientDetails(res.data[0]); // Assuming res.data is an array, take the first element
//                 console.log("done", res.data);
//             } catch (error) {
//                 console.error("Error occurred:", error);
//             }
//         };

//         fetchPatientDetails();
//     }, [id]);
     



//     const handleFileChange=(event) =>{
//         const selectedFile = event.target.files[0];

//         setSize(selectedFile.size / (1024 * 1024));

//         if (selectedFile) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setFile(reader.result.split(',')[1]);
//             };
//             reader.readAsDataURL(selectedFile);
//             const filename = event.target.value.replace("C:\\fakepath\\", "");
//             setFileName(filename);
//         } else {
//             alert('No file selected');
//         }
//     }


//     const submitImage = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post(`/en/uploadpdf`, { file: file, filename: fileName });
//             console.log("Successfully uploaded.");
//         } catch (error) {
//             console.log("Error uploading details:", error);
//             alert('File size too large');
//         }
//     };

//     return (
//         <div>
//             <Navigationvar />
//             <div className="container">
//                 <div className="row">
//                     <button className="col-sm" style={{ fontSize: '25px', backgroundColor: '#990011FF', color: 'white', marginTop: '1%', marginLeft: '10%', marginRight: '10%' }}>
//                         {patientDetails ? patientDetails.patientName : "Loading..."}
//                     </button>
//                 </div>
//             </div>

//             {patientDetails && (
//                 <div className="container2">
//                     <div className="row">
//                         <div className="col" style={{ marginLeft: '20%', marginTop: '2%' }}>
//                             <h5>PATIENT NAME: {patientDetails.patientName}</h5>
//                             <br />
//                             <h5>DOCTOR NAME: {patientDetails.doctorName}</h5>
//                             <br />
//                             <h5>AGE: {patientDetails.age}</h5>
//                             <br />
//                             <h5>GENDER: {patientDetails.gender}</h5>
//                             <br />
//                             <h5>BLOOD GROUP: {patientDetails.bloodGroup}</h5>
//                             <br />
//                         </div>
//                         <div className="col" style={{ marginTop: '4%' }}>
//                             <img src='./images.jpeg' style={{ maxWidth: '100%', maxHeight: '100%' }} alt="Patient" />
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <div className="container3">
//                 <div className="row">
//                     <div className="col" style={{ marginTop: '2%', marginLeft: '10%', marginRight: '10%' }}>
//                         <h5>RECOMMENDED TREATMENT</h5>
//                         <p style={{ fontSize: '20px' }}>
//                             {patientDetails ? patientDetails.treatment : "Loading..."}
//                         </p>
//                         <button type="submit" style={{ backgroundColor: '#990011FF', color: 'white' }}>ENDORSE THE TREATMENT</button>
//                     </div>
//                 </div>
//             </div>

//             <div className="container4">
//                 <div className="row">
//                     <div className="col" style={{ marginTop: '5%', marginLeft: '10%', marginRight: '10%' }}>
//                         <h5>PRESCRIPTION</h5>
//                         <p style={{ fontSize: '20px' }}>
//                             {patientDetails ? patientDetails.prescription : "Loading..."}
//                         </p>
//                         <button type="submit" style={{ backgroundColor: '#990011FF', color: 'white' }}>DOWNLOAD PRESCRIPTION</button>
//                     </div>
//                 </div>
//             </div>

//             <div className="container5">
//                 <div className="row">
//                     <div className="col" style={{ marginTop: '5%', marginLeft: '10%', marginRight: '10%' }}>
//                         <h5>UPLOAD NEW REPORT</h5>
//                         <input type="file" accept="application/pdf" onChange={handleFileChange} />
//                         <button type="submit" style={{ backgroundColor: '#990011FF', color: 'white' }} onClick={submitImage}>SUBMIT</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
