const axios = require('axios');  // Add this line at the top

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      console.log('Received message:', message);

      const decryptResponse = await axios.post(
        process.env.API_GATEWAY_URL,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Decrypt response:', decryptResponse.data);

      const decryptedApiKey = decryptResponse.data.decryptedKey;

      if (!decryptedApiKey) {
        throw new Error('Decryption failed or key not found in the response.');
      }

      const openaiResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: process.env.OPENAI_MODEL_ID || 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
        },
        {
          headers: {
            Authorization: `Bearer ${decryptedApiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('OpenAI response:', openaiResponse.data);

      res.json({ response: openaiResponse.data.choices[0].message.content });
    } catch (error) {
      console.error('Error in /api/chat:', error);
      res.status(500).json({
        error: 'An error occurred while processing your request',
        details: error.message,
        stack: error.stack,
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      console.log('Received message:', message);

      const decryptResponse = await axios.post(
        process.env.API_GATEWAY_URL,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Decrypt response:', decryptResponse.data);

      const decryptedApiKey = decryptResponse.data.decryptedKey;

      if (!decryptedApiKey) {
        throw new Error('Decryption failed or key not found in the response.');
      }

      const openaiResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: process.env.OPENAI_MODEL_ID || 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
        },
        {
          headers: {
            Authorization: `Bearer ${decryptedApiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('OpenAI response:', openaiResponse.data);

      res.json({ response: openaiResponse.data.choices[0].message.content });
    } catch (error) {
      console.error('Error in /api/chat:', error);
      res.status(500).json({
        error: 'An error occurred while processing your request',
        details: error.message,
        stack: error.stack,
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

