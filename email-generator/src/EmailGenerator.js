import React, { useState } from 'react';
import axios from 'axios';
import './EmailGenerator.css';


const EmailGenerator = () => {
  const [formData, setFormData] = useState({
    senderName: '',
    receiverName: '',
    mailType: '',
    verbose: '',
    emailSubject: '',
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
              content: `Sender Name: ${formData.senderName}\nReceiver Name: ${formData.receiverName}\nMail Type: ${formData.mailType}\nVerbose: ${formData.verbose}\nEmail Subject: ${formData.emailSubject}`
            }
          ],
          max_tokens: 150
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer <Your API Key>'
          }
        }
      );
      setFormData({ ...formData, generatedEmail: response.data.choices[0].message.content });
    } catch (error) {
      console.error('Error generating email:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="senderName" value={formData.senderName} onChange={handleChange} placeholder="Sender Name" />
        <input type="text" name="receiverName" value={formData.receiverName} onChange={handleChange} placeholder="Receiver Name" />
        <select name="mailType" value={formData.mailType} onChange={handleChange}>
          <option value="Professional">Professional</option>
          <option value="Personal">Personal</option>
        </select>
        <select name="verbose" value={formData.verbose} onChange={handleChange}>
          <option value="Complex">Complex</option>
          <option value="Simple">Simple</option>
          <option value="Crisp">Crisp</option>
          <option value="Elaborated">Elaborated</option>
        </select>
        <input type="text" name="emailSubject" value={formData.emailSubject} onChange={handleChange} placeholder="Email Subject" />
        <button type="submit">Generate Email</button>
      </form>
      {formData.generatedEmail && <div><h2>Generated Email:</h2><p>{formData.generatedEmail}</p></div>}
    </div>
  );
};

export default EmailGenerator;


