const express = require('express');
const cors = require('cors');
const AWS = require('aws-sdk');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configure AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const lambda = new AWS.Lambda();

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    // Decrypt OpenAI API Key
    const params = {
      FunctionName: process.env.AWS_LAMBDA_ARN,
      InvocationType: 'RequestResponse'
    };
    const decryptResult = await lambda.invoke(params).promise();
    const openaiApiKey = JSON.parse(decryptResult.Payload).decryptedKey;

    // Call OpenAI API
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: process.env.OPENAI_MODEL_ID || 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: req.body.message }]
      },
      {
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ response: openaiResponse.data.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
      res.status(error.response.status).json({ error: 'An error occurred with the OpenAI API' });
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
      res.status(500).json({ error: 'No response received from the OpenAI API' });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
      res.status(500).json({ error: 'An error occurred while processing your request' });
    }
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
app.post('/api/chat', async (req, res) => {
  try {
    // Decrypt OpenAI API Key
    console.log('Attempting to decrypt OpenAI API Key...');
    const params = {
      FunctionName: process.env.AWS_LAMBDA_ARN,
      InvocationType: 'RequestResponse'
    };
    const decryptResult = await lambda.invoke(params).promise();
    console.log('Decryption result received');
    const openaiApiKey = JSON.parse(decryptResult.Payload).decryptedKey;
    
    if (!openaiApiKey) {
      throw new Error('Failed to decrypt OpenAI API Key');
    }

    console.log('Making request to OpenAI API...');
    // Call OpenAI API
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: process.env.OPENAI_MODEL_ID || 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: req.body.message }]
      },
      {
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('OpenAI API response received');
    res.json({ response: openaiResponse.data.choices[0].message.content });
  } catch (error) {
    console.error('Error in /api/chat:', error);
    if (error.response) {
      console.error('OpenAI API error:', error.response.data);
      res.status(error.response.status).json({ error: 'An error occurred with the OpenAI API', details: error.response.data });
    } else {
      console.error('Server error:', error.message);
      res.status(500).json({ error: 'An error occurred while processing your request', details: error.message });
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
