const express = require('express');
const app = express();
const { patient ,report,User} = require('../schema');
const {ObjectId} = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const getReport = async (req, res) => {
    try {
        
        const id = req.params.id;
        console.log(id)
        const reportInfo = await report.findOne({ _id: id });
    
        res.json(reportInfo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to retrieve reports' });
    }
}
const getPatient = async (req,res) => {
    const id = req.params.id;
    const patientInfo =await patient.findOne({_id:id});
    res.json(patientInfo);
}

const setPatient = async (req,res)=>{
    try{const info = req.body;

    // Log the received form data
    console.log('Received form data:', info);
    
    let newpatient = new patient({
        name:info.firstName +" "+info.lastName,
        DOB:info.dateOfBirth,
        chronics:info.chronics,
        bloodGroup:info.bloodGroup,
        phone:info.phoneNumber,
        gender:info.gender
    })
    newpatient = await newpatient.save();
    console.log("patient saved");
    res.json(newpatient);
} catch(err){
    console.log(err)
}
}

const editPatient = async (req,res)=>{
    const { formDataToSend,patientId} = req.body;
    console.log(patientId,formDataToSend);

    const patientInfo =await patient.findOne({_id:patientId});
    patientInfo.name=formDataToSend.firstName +" "+formDataToSend.lastName;
    patientInfo.DOB=formDataToSend.dateOfBirth;
    patientInfo.chronics=formDataToSend.chronics;
    patientInfo.bloodGroup=formDataToSend.bloodGroup;
    patientInfo.phone=formDataToSend.phoneNumber;
    patientInfo.gender=formDataToSend.gender;
    patientInfo.save();
    console.log("success")
    res.json({data : "success"});

}

function formatDate(inputDate){
    const date=new Date(inputDate);
    const day=String(date.getDate()).padStart(2,'0');
    const month= String(date.getMonth()+1).padStart(2,'0');
    const year=date.getFullYear();
    return `${day}/${month}/${year}`
}


const getDates = async (req,res)=>{
    const id = req.params.id;
    const data = await report.find({patientId:id});
    const dates = data.map(item=>({
        file: item._id,
        specialistReq:item.specialistReq,
        date: item.valuesFromReport.date ? item.valuesFromReport.date : formatDate(item.dateOfReport)

    }))
    
    res.json(dates);

}

const getPrevReports = async (req,res)=>{
    const { patientId,reportId} = req.body;
    console.log(reportId)
    const data = await report.find({patientId:patientId});
    const modified = data.filter(item => item._id.toString() !== reportId.toString());
    
    const dates = modified.map(item=>({
        file: item._id,
        specialistReq:item.specialistReq,
        date: item.valuesFromReport.date ? item.valuesFromReport.date : formatDate(item.dateOfReport)

    }))
    //console.log(dates);
    res.json(dates);

}


const getPatients = async (req,res) => {
    try{
        const patients = await patient.find() // TODO: add session oldagehome queryfetch 
        res.json(patients);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to retrieve patients'});
    }
}


const getreports = async (req,res) => {
    try{
        const reports = await report.find();
        res.json(reports);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to retrieve reports'});
    }
}

const getOldageHomeInfo = async (req,res) => {
    try{
        const name = req.params.name;
        const oldAgeHomeDetails = await oldAgeHome.findOne(); // TODO: add session oldagehome query
        res.json(oldAgeHomeDetails);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to retrieve old age home details'});
    }
}

const savePrecautions = async (req,res)=>{

    const {reportId,precautions,doctorNotes}=req.body;
    const a= await report.findOne({_id:reportId});
    a.precautions=precautions;
    a.doctorNotes=doctorNotes;
    a.isVerified=true;
    a.save();
    res.json(a);
    
}

const getreportsdetails=async(req,res)=>
    {
      const { id } = req.query; 
     
      
    
      try {
        const details = await report.findOne({ _id: id }); 
        if (!details) {
          return res.status(404).json({ message: 'No report found for the given ID.' });
        }
        
        res.json(details);
      } catch (error) {
        console.error('Error fetching report details:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
      }
    }
    
    const updatedoctornotes=async(req,res)=>
    {
      try {
        const { id } = req.params;
        const { doctorNotes } = req.body;
       
    
        // Validate inputs if needed
        if (!doctorNotes) {
          return res.status(400).json({ error: 'Doctor notes are required' });
        }
    
        const updatedReport = await report.findByIdAndUpdate(id, {doctorNotes : doctorNotes, isVerified:"true"} , { new: true });
        res.status(200).json(updatedReport);
      } catch (error) {
        console.error('Error updating doctor notes:', error);
        res.status(500).json({ error: 'Error updating doctor notes' });
    }
    }
    const login=async(req,res)=>
        {
          const { email, password, userRole } = req.body;
         
        
          try {
           
            const user = await User.findOne({ email:email, role:userRole });
            if (!user) {
              return res.status(400).json({ msg: 'Invalid credentials.' });
            }
        
         
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
              return res.status(400).json({ msg: 'Invalid credentials.' });
            }
            else{
            req.session.loggedInemail = user.email;
            req.session.status = 1;
            if(userRole==='doctor'){
              req.session.typeofuser=0;
            }
            else{
              req.session.typeofuser=1;
            }
            res.status(200).json({ msg: 'Login successful!' });
            }
          } catch (error) {
            res.status(500).json({ msg: 'Server error.' });
          }
        }
        
        
        
        
        const newuser=async(req,res)=>
        {
          const { email, name,role  } = req.body;
        
        
          
        
          try {
            
            let user = await User.findOne({ email });
            if (user) {
              return res.status(400).json({ msg: 'User already exists.' });
            }
            
            const resetToken = crypto.randomBytes(32).toString('hex');
            user = new User({ email, name, role, resetToken });
            await user.save();
        
            
        
           
            const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'mathiangelina0@gmail.com',
                pass: 'afizealfkixuopwa'
              }
            });
            const mailOptions = {
              from: 'mathiangelina0@gmail.com',
              to: email,
              subject: 'Password Reset',
              html: `<p>Click <a href="${resetUrl}">here</a> to set your password.</p>`
            };
        
            await transporter.sendMail(mailOptions);
           
            res.status(200).json({ msg: 'Signup successful! Please check your email to set your password.' });
          } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ msg: 'Server error.' });
          }
        }
        
        
        const passwordreset=async(req,res)=>
        {
          const { token } = req.params;
          const { password } = req.body;
        
          try {
           
            const user = await User.findOne({ resetToken: token });
            if (!user) {
              return res.status(400).json({ msg: 'Invalid or expired token.' });
            }
        
            const hashedPassword = await bcrypt.hash(password, 10);
        
           
            user.password = hashedPassword; 
            user.resetToken = token; 
            await user.save();
        
            res.status(200).json({ msg: 'Password has been set successfully! You can now login.' });
          } catch (error) {
            res.status(500).json({ msg: 'Server error.' });
          }
        }
        const checkSessionEndpoint = async(req,res)=>{
          if(req.session.loggedInemail){
            res.json([
              req.session.loggedInemail,
              req.session.typeofuser,
              req.session.status,
            ])
          }
        }
        
        

module.exports = { getReport, getPatient, setPatient, getPatients, getOldageHomeInfo,getDates,savePrecautions,getPrevReports,getreports,editPatient,getreportsdetails,updatedoctornotes,login,newuser,passwordreset,checkSessionEndpoint}