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

// Debugging route
app.get('/debug', async (req, res) => {
  try {
    const debugInfo = {
      awsRegion: process.env.AWS_REGION,
      lambdaArn: process.env.AWS_LAMBDA_ARN,
      openaiModelId: process.env.OPENAI_MODEL_ID || 'gpt-3.5-turbo'
    };
    res.json(debugInfo);
  } catch (error) {
    res.status(500).json({ error: 'Debug route error', message: error.message });
  }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  console.log('Received chat request');
  try {
    // Step 1: Decrypt OpenAI API Key
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

    // Step 2: Call OpenAI API
    console.log('Making request to OpenAI API...');
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

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
