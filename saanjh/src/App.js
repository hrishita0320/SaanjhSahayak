import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import Main from './components/Main';
// import router from '../../backend/Allroutes';
import { useState } from 'react';
import React from 'react';
import Chatbot1 from './components/Chatbot1'
import MyFrontpage from './components/MyFrontpage';
import Doctor from './components/Doctors';
import Upload from './components/Upload';
import Caretakers from './components/Caretakers';
import Login from './components/Login';
import Profile from './components/Profile';
import Analysis from './components/Analysis';
import AnalysisDoctor from './components/AnalysisDoctor';
import DoctorProfile from './components/DoctorProfile';
import Chatbot from './components/Chatbot';
import Newuser from './components/Newuser';
import Passwordreset from './components/Passwordreset';
import axios from 'axios';

function App() {
  const [userData,setuserData] = useState(null);
  const checkSession = async()=>{
    try{
      const response = await axios.get(`http://localhost:3001/en/checkSessionend`);
      if(response.data){
        setuserData(response.data);
      }
      else{
        setuserData(null);
      }
    }
    catch(error){
      console.error("Error checking the seeion");
      setuserData(null);
    }
  };

  return (
    <div className="App">
       {/* <Chatbot1/>  */}

      <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<MyFrontpage/>}></Route>
        <Route path='/Doctors' element ={<Doctor/>}></Route>
        <Route path='/Caretakers' element={<Caretakers/>}></Route>
        <Route path='/Upload' element={<Upload/>}></Route>
        <Route path='/Profile/:id' element={<Profile/>}></Route>
        <Route path='/report/:id' element={<Analysis/>}/>
        <Route path='/reportdoctor/:id' element={<AnalysisDoctor/>}/>
        <Route path='/doctorprofile/:id' element={<DoctorProfile/>}></Route>
        <Route path='/chatbot' element={<Chatbot/>}/>
        <Route path="/login" element={<Login/>}/>
      <Route path='reset-password/:token' element={<Passwordreset/>}/>
      <Route path="/newuser" element={<Newuser/>}/>
      <Route path="/chat" element={<Chatbot1/>}/>

        

        
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
