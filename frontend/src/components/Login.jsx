import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Navigationvar from "./Navigationvar";
// import bot from '../assets/chat-bot-logo-design-concept-600nw-1938811039.webp';
import Header from './Header';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('doctor'); // Default role
  const [message, setMessage] = useState('');


  const navigate = useNavigate();
  // const handleChatbotClick = async () => {
  //   navigate('/chatbot');
  // };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/en/login', { email, password, userRole });

      if (response.status === 200) {
        setMessage('Login successful!');
        if (userRole === 'doctor') {
          navigate('/doctors'); 
        } else if (userRole === 'caretaker') {
          navigate('/Caretakers'); 
        }
      } else {
        setMessage('Login failed, please check your credentials.');
      }
    } catch (error) {
      setMessage('An error occurred.');
      console.error('Error:', error);
    }
  };

  const formStyle = {
    width: '300px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    textAlign: 'center'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#990011FF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const linkStyle = {
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline'
  };

  return (<div><Header/>
    <div style={{ textAlign: 'center' }}>

      <h3 style={{marginTop:'6%'}}>Login</h3>
      <div style={formStyle}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <select
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
          style={inputStyle}
        >
          <option value="doctor">Doctor</option>
          <option value="caretaker">Caretaker</option>
        </select>
        <button style={buttonStyle} onClick={handleLogin}>
          Login
        </button>
        <p>
          Don't have an account? 
          <span style={linkStyle} onClick={() => navigate('/newuser')}>
            Signup here.
          </span>
        </p>
        {message && <p>{message}</p>}
      </div>
      {/* <div style={{ position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer' }} onClick={handleChatbotClick}>
        <img src={bot} alt="Chatbot Icon" style={{ width: '50px', height: '50px' }} />
      </div> */}
    </div>
    </div>
  );
}

export default Login;
