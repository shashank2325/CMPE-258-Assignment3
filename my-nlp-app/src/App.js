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

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleContextChange = (event) => {
        setContext(event.target.value);
    };

    const handleSubmit = async () => {
        const url = `http://localhost:5000/${task.toLowerCase()}`;
        // Ensure the task string matches the dropdown option exactly
        let data = { text: input };
        if (task === 'Answer') {  // Make sure 'Answer' matches the exact string in the option value
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
      <select onChange={e => setTask(e.target.value)}>
          <option value="">Select Task</option>
          <option value="Translate">Translation</option>
          <option value="Summarize">Summarization</option>
          <option value="Answer">Question Answering</option>
      </select>
      {task === 'Answer' && (
          <>
              <textarea placeholder="Enter context here..." value={context} onChange={handleContextChange} />
              <textarea placeholder="Enter question here..." value={input} onChange={handleInputChange} />
          </>
      )}
      {task !== 'Answer' && (
          <textarea placeholder="Enter text here..." value={input} onChange={handleInputChange} />
      )}
      <button onClick={handleSubmit}>Submit</button>
      <div>{typeof result === 'object' ? JSON.stringify(result) : result}</div>
  </div>
    );
}

export default App;