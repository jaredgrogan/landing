const axios = require('axios');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { message, image, service } = req.body;

      if (!message) {
        console.error('No message provided');
        return res.status(400).json({ error: 'Message is required' });
      }

      console.log('Received message:', message);
      console.log('Service:', service);

      // API Gateway call to decrypt the API keys
      const decryptResponse = await axios.post(
        process.env.API_GATEWAY_URL,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const {
        OPENAI_API_KEY: decryptedOpenAIApiKey,
        PERPLEXITY_API_KEY: decryptedPerplexityApiKey,
        ANTHROPIC_API_KEY: decryptedAnthropicApiKey
      } = decryptResponse.data;

      if (!decryptedOpenAIApiKey || !decryptedPerplexityApiKey || !decryptedAnthropicApiKey) {
        throw new Error('Decryption failed or keys not found in the response.');
      }

      let aiResponse;

      switch (service) {
        case 'openai-text':
          aiResponse = await handleOpenAIText(message, decryptedOpenAIApiKey);
          break;
        case 'openai-vision':
          aiResponse = await handleOpenAIVision(message, image, decryptedOpenAIApiKey);
          break;
        case 'perplexity':
          aiResponse = await handlePerplexity(message, decryptedPerplexityApiKey);
          break;
        case 'anthropic':
          aiResponse = await handleAnthropic(message, decryptedAnthropicApiKey);
          break;
        default:
          throw new Error('Invalid service specified');
      }

      console.log('AI response status:', aiResponse.status);

      res.json({ response: aiResponse.data.choices[0].message.content });
    } catch (error) {
      console.error('Error in /api/chat:', error.message);
      console.error('Stack trace:', error.stack);
      res.status(500).json({
        error: 'An error occurred while processing your request',
        details: error.message,
        stack: error.stack,
      });
    }
  } else {
    console.error('Invalid request method:', req.method);
    res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleOpenAIText(message, apiKey) {
  return axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: process.env.OPENAI_MODEL_ID || 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );
}

async function handleOpenAIVision(message, image, apiKey) {
  return axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'system',
          content: 'You are Herakles, an AI assistant specialized in image analysis.'
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: message },
            { type: 'image_url', image_url: { url: image } }
          ]
        }
      ],
      max_tokens: 300
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );
}

async function handlePerplexity(message, apiKey) {
  // Placeholder for Perplexity API call
  // Replace with actual Perplexity API endpoint and request format
  return axios.post(
    'https://api.perplexity.ai/chat/completions',
    {
      model: 'mixtral-8x7b-instruct',
      messages: [{ role: 'user', content: message }],
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );
}

async function handleAnthropic(message, apiKey) {
  // Placeholder for Anthropic API call
  // Replace with actual Anthropic API endpoint and request format
  return axios.post(
    'https://api.anthropic.com/v1/messages',
    {
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      messages: [{ role: 'user', content: message }],
    },
    {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
    }
  );
}
