const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ALLOWED_ORIGINS || '*', // Limit to specific origins in production
}));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Decrypting OpenAI API Key using API Gateway...');
    const decryptResponse = await axios.post(
      process.env.API_GATEWAY_URL, // Use the API Gateway URL from your environment variables
      {},
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const decryptedApiKey = decryptResponse.data.decryptedKey;

    if (!decryptedApiKey) {
      throw new Error('Decryption failed or key not found in the response.');
    }

    console.log('Calling OpenAI API...');
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: process.env.OPENAI_MODEL_ID || 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }]
      },
      {
        headers: {
          'Authorization': `Bearer ${decryptedApiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Check for non-JSON response
    const contentType = openaiResponse.headers['content-type'];
    if (contentType && contentType.indexOf('application/json') === -1) {
      throw new Error(`Received non-JSON response: ${openaiResponse.data.substring(0, 100)}... Status: ${openaiResponse.status}`);
    }

    if (!openaiResponse.data || !openaiResponse.data.choices || !openaiResponse.data.choices[0] || !openaiResponse.data.choices[0].message) {
      throw new Error('Unexpected response from OpenAI API');
    }

    console.log('OpenAI API response received');
    res.json({ response: openaiResponse.data.choices[0].message.content });
  } catch (error) {
    console.error('Error in /api/chat:', error.message);
    res.status(500).json({ 
      error: 'An error occurred while processing your request',
      details: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // For testing purposes
