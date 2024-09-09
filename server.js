const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ALLOWED_ORIGINS || '*',
}));
app.use(express.json());
app.use(bodyParser.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Function to call OpenAI API
async function callOpenAIAPI(message, apiKey, model = 'gpt-3.5-turbo') {
  const openaiResponse = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: model,
      messages: [{ role: 'user', content: message }]
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return openaiResponse.data.choices[0].message.content;
}

// Function to call Perplexity API
async function callPerplexityAPI(message) {
  try {
    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: 'mixtral-8x7b-instruct',
        messages: [{ role: 'user', content: message }]
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
    const { message, usePerplexity, analysisType, image } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    let response;

    if (image) {
      // GPT-4V Image Analysis
      let developerMessage = message;
      if (analysisType === 'description') {
        developerMessage = `Herakles: Describe the image in 150 characters and add a haiku - labeled as such (begins with "**Haiku:**" and the haiku is in italics).`;
      }

      const gptResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4-vision-preview',
          messages: [
            {
              role: 'system',
              content: `The AI must always refer to itself as Herakles. Analyze the image as requested by the user.`
            },
            {
              role: 'user',
              content: [
                { type: 'text', text: `Analysis type: ${analysisType}. ${developerMessage}` },
                { type: 'image_url', image_url: { url: image } }
              ]
            }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          }
        }
      );

      response = `Herakles says: ${gptResponse.data.choices[0].message.content}`;
    } else if (usePerplexity) {
      console.log('Calling Perplexity API...');
      response = await callPerplexityAPI(message);
    } else {
      console.log('Decrypting OpenAI API Key using API Gateway...');
      const decryptResponse = await axios.post(
        process.env.API_GATEWAY_URL,
        {},
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const decryptedApiKey = decryptResponse.data;
      if (!decryptedApiKey) {
        throw new Error('Decryption failed or key not found in the response.');
      }
      console.log('Calling OpenAI API...');
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
