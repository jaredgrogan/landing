const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ALLOWED_ORIGINS || '*',
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

// Herakles AI persona prompt
const heraklesPrompt = `
You are Herakles AI, an advanced AI assistant created by Universitas AI for productivity, research, and learning. 
You serve as a mentor, assistant, and guide to users. Your responses should always align with this persona, 
regardless of the underlying AI model. Focus on being helpful, insightful, and supportive in all interactions.
`;

// Function to call OpenAI API
async function callOpenAIAPI(message, apiKey) {
  try {
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: process.env.OPENAI_MODEL_ID || 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: heraklesPrompt },
          { role: 'user', content: message }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return openaiResponse.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
}

// Function to call Perplexity API
async function callPerplexityAPI(message) {
  try {
    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: 'mixtral-8x7b-instruct',
        messages: [
          { role: 'system', content: heraklesPrompt },
          { role: 'user', content: message }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Perplexity API Error:', error);
    throw error;
  }
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, usePerplexity } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    let response;
    console.log('Decrypting OpenAI API Key using API Gateway...');
    const decryptResponse = await axios.post(
      process.env.API_GATEWAY_URL,
      {},
      { headers: { 'Content-Type': 'application/json' } }
    );
    const decryptedApiKey = decryptResponse.data;

    if (!decryptedApiKey) {
      throw new Error('Decryption failed or key not found in the response.');
    }

    if (usePerplexity) {
      console.log('Calling Perplexity API as Herakles AI...');
      response = await callPerplexityAPI(message);
    } else {
      console.log('Calling OpenAI API as Herakles AI...');
      response = await callOpenAIAPI(message, decryptedApiKey);
    }

    res.json({ response });
  } catch (error) {
    console.error('Error in /api/chat:', error.message);
    res.status(500).json({
      error: 'An error occurred while processing your request',
      details: error.message,
      stack: error.stack
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
