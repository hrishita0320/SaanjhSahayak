import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [query, setQuery] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const askQuestion = async () => {
        if (query.trim() === "") return;

        setLoading(true);
        setAnswer(""); // Clear previous answer
        try {
            const response = await axios.post("http://localhost:5000/ask", { query });
            setAnswer(response.data.answer);
        } catch (error) {
            console.error("Error:", error);
            setAnswer("Something went wrong. Please try again later.");
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>Chat with PDF</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about your PDF"
            />
            <button onClick={askQuestion} disabled={loading}>
                {loading ? "Loading..." : "Ask"}
            </button>
            {answer && (
                <div>
                    <h2>Answer:</h2>
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

export default Chatbot;