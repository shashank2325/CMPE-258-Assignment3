import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
    const [task, setTask] = useState('');
    const [input, setInput] = useState('');
    const [context, setContext] = useState('');
    const [result, setResult] = useState('');
    const [language, setLanguage] = useState('en');  // Default language English

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleContextChange = (event) => {
        setContext(event.target.value);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleSubmit = async () => {
        const url = `http://localhost:5000/${task.toLowerCase()}`;
        let data = { text: input };
        if (task === 'Translate') {
            // English ('en') is always the source language, `language` is the target language
            data = { text: input, source_language: 'en', target_language: language };
        } else if (task === 'Answer') {
            data = { question: input, context: context };
        }
    
        try {
            const response = await axios.post(url, data);
            setResult(response.data.answer || response.data.summary || response.data.translation || "No valid response received");
        } catch (error) {
            console.error('Error fetching data: ', error);
            setResult("Failed to fetch data");
        }
    };
    
    return (
      <div className="container">
        <h1 style={{ textAlign: 'center' }}>NLP Models Hosting</h1>
        <select onChange={e => setTask(e.target.value)}>
            <option value="">Select Task</option>
            <option value="Translate">Translation</option>
            <option value="Summarize">Summarization</option>
            <option value="Answer">Question Answering</option>
        </select>
        {task === 'Translate' && (
            <select value={language} onChange={handleLanguageChange}>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                {/* Add more languages as needed */}
            </select>
        )}
        {task === 'Answer' && (
            <>
                <textarea placeholder="Enter context here..." value={context} onChange={handleContextChange} />
                <textarea placeholder="Enter question here..." value={input} onChange={handleInputChange} />
            </>
        )}
        {task !== 'Answer' && task !== 'Translate' && (
            <textarea placeholder="Enter text here..." value={input} onChange={handleInputChange} />
        )}
        {task === 'Translate' && (
            <textarea placeholder="Enter text to translate..." value={input} onChange={handleInputChange} />
        )}
        <button onClick={handleSubmit}>Submit</button>
        <div className="result-box">
  {result ? (typeof result === 'object' ? JSON.stringify(result) : result) : "Your result will appear here..."}
</div>
      </div>
    );
}

export default App;
