import React, { useState } from 'react';
import axios from 'axios';
import './chatbot.css';
import Header from './Header';
// import Navigationvar from './Navigationvar';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post('http://localhost:3001/en/chatbot', {
        message: input,
      });

      setMessages([...newMessages, { text: response.data.reply, sender: 'bot' }]);
    } catch (error) {
      console.error('Error communicating with backend:', error);
    }
  };

  return (
    <div>
    {/* <Navigationvar /> */}
    <Header/>
    <div className="App1">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} style={{ backgroundColor: '#990011FF', color: 'white' }}>Send</button>
      </div>
    </div>
    </div>
  );
}

export default Chatbot;