import React, { useState } from 'react';
import axios from 'axios';
import './EmailGenerator.css';

const EmailGenerator = () => {
  const [formData, setFormData] = useState({
    senderName: '',
    receiverName: '',
    mailType: '',
    verbose: '',
    emailContent: '',
    generatedEmail: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `Sender Name: ${formData.senderName}\nReceiver Name: ${formData.receiverName}\nMail Type: ${formData.mailType}\nVerbose: ${formData.verbose}\n${formData.emailContent}`
            }
          ],
          max_tokens: 150
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
          }
        }
      );
      setFormData({ ...formData, generatedEmail: response.data.choices[0].message.content });
    } catch (error) {
      console.error('Error generating email:', error);
    }
  };

  const handleClear = () => {
    setFormData({
      senderName: '',
      receiverName: '',
      mailType: '',
      verbose: '',
      emailContent: '',
      generatedEmail: ''
    });
  };

  return (
    <div className="email-generator">
      <h1>Email Content Generator</h1>
      <p className="description">Generate email templates as per user input using AI</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="senderName">Sender Name:</label>
          <input
            type="text"
            id="senderName"
            name="senderName"
            value={formData.senderName}
            onChange={handleChange}
            placeholder="Sender Name"
            required
            aria-label="Sender Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="receiverName">Receiver Name:</label>
          <input
            type="text"
            id="receiverName"
            name="receiverName"
            value={formData.receiverName}
            onChange={handleChange}
            placeholder="Receiver Name"
            required
            aria-label="Receiver Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="mailType">Mail Type:</label>
          <select
            id="mailType"
            name="mailType"
            value={formData.mailType}
            onChange={handleChange}
            required
            aria-label="Mail Type"
          >
            <option value="">Select Mail Type</option>
            <option value="Professional">Professional</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="verbose">Verbose:</label>
          <select
            id="verbose"
            name="verbose"
            value={formData.verbose}
            onChange={handleChange}
            required
            aria-label="Verbose"
          >
            <option value="">Select Verbose</option>
            <option value="Complex">Complex</option>
            <option value="Simple">Simple</option>
            <option value="Crisp">Crisp</option>
            <option value="Elaborated">Elaborated</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="emailContent">Email Content:</label>
          <textarea
            id="emailContent"
            name="emailContent"
            value={formData.emailContent}
            onChange={handleChange}
            placeholder="Email Content"
            required
            aria-label="Email Content"
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: formData.generatedEmail ? '#007bff' : '#004d99',
            color: '#fff',
            fontSize: '14px',
            marginBottom: '10px'
          }}
        >
          {formData.generatedEmail ? 'Re-Generate' : 'Generate'}
        </button>
        <button
          type="button"
          onClick={handleClear}
          style={{
            backgroundColor: '#ff3333',
            color: '#fff',
            fontSize: '14px',
            marginBottom: '10px'
          }}
        >
          Clear
        </button>
      </form>
        {formData.generatedEmail && (
          <div className="generated-email">
            <h2>Generated Email:</h2>
            <p>{formData.generatedEmail}</p>
          </div>
        )}
      <p className="disclaimer">Generated by AI. Please verify for accuracy.</p>
    </div>
  );
};

export default EmailGenerator;
