const express = require('express');
const cors = require('cors');
const AWS = require('aws-sdk');
const axios = require('axios');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
require('dotenv').config();

const app = express();

// Sentry initialization
Sentry.init({
  dsn: process.env.SENTRY_DSN, // Make sure to add this to your environment variables
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

// Middleware
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(cors());
app.use(express.json());

// Configure AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const lambda = new AWS.Lambda();

// Debug endpoint
app.get('/api/debug', (req, res) => {
  const debugInfo = {
    nodeEnv: process.env.NODE_ENV,
    awsRegion: process.env.AWS_REGION,
    openaiModelId: process.env.OPENAI_MODEL_ID || 'gpt-3.5-turbo',
    // Add other non-sensitive configuration info here
  };
  res.json(debugInfo);
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Decrypt OpenAI API Key
    const params = {
      FunctionName: process.env.AWS_LAMBDA_ARN,
      InvocationType: 'RequestResponse'
    };
    const decryptResult = await lambda.invoke(params).promise();
    const openaiApiKey = JSON.parse(decryptResult.Payload).decryptedKey;

    if (!openaiApiKey) {
      throw new Error('Failed to decrypt OpenAI API Key');
    }

    // Call OpenAI API
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: process.env.OPENAI_MODEL_ID || 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }]
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
    console.error('Error in /api/chat:', error);
    Sentry.captureException(error);
    res.status(500).json({ 
      error: 'An error occurred while processing your request',
      details: error.message
    });
  }
});

// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', message: 'The requested endpoint does not exist' });
});

// Sentry error handler
app.use(Sentry.Handlers.errorHandler());

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
