// api/chat.js (Server-side code)

const cors = require('cors');
const axios = require('axios');
const FormData = require('form-data');

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:3000', 'https://your-vercel-app.vercel.app', 'https://www.universitas.pro'];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['POST', 'OPTIONS']
};

export default async function handler(req, res) {
  await new Promise((resolve, reject) => {
    cors(corsOptions)(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

  if (req.method === 'POST') {
    try {
      const { message, image, service, analysisType } = req.body;
      
      if (!message && !image) {
        console.error('No input provided');
        return res.status(400).json({ error: 'Message or image is required' });
      }

      console.log('Received request:', { message, analysisType, image: !!image, service });

      const decryptResponse = await axios.post(
        process.env.API_GATEWAY_URL,
        {},
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Decrypt response status:', decryptResponse.status);

      const {
        OPENAI_API_KEY: decryptedOpenAIApiKey,
        PERPLEXITY_API_KEY: decryptedPerplexityApiKey
      } = decryptResponse.data;

      if (!decryptedOpenAIApiKey || !decryptedPerplexityApiKey) {
        throw new Error('Decryption failed or keys not found in the response.');
      }

      let aiResponse;

      switch (service) {
        case 'openai-vision':
          aiResponse = await handleOpenAIVision(message, image, analysisType, decryptedOpenAIApiKey);
          break;
        case 'perplexity':
          aiResponse = await handlePerplexity(message, image, decryptedPerplexityApiKey);
          break;
        case 'openai':
        default:
          aiResponse = await handleOpenAIText(message, decryptedOpenAIApiKey);
          break;
      }

      console.log('AI response status:', aiResponse.status);
      console.log('AI response data:', aiResponse.data);

      res.json({ 
        response: aiResponse.data.choices ? aiResponse.data.choices[0].message.content : aiResponse.data.output,
        image: aiResponse.data.image
      });
    } catch (error) {
      console.error('Error in /api/chat:', error);
      res.status(500).json({
        error: 'An error occurred while processing your request',
        details: error.message
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleOpenAIText(message, apiKey) {
  return axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: process.env.OPENAI_MODEL_ID || 'gpt-4-turbo-2024-04-09',
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

async function handleOpenAIVision(message, image, analysisType, apiKey) {
  return axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4-turbo-2024-04-09',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: `Analysis type: ${analysisType}. ${message}` },
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

async function handlePerplexity(message, image, apiKey) {
  const formData = new FormData();
  formData.append('model', 'llama-3.1-sonar-small-128k-online');
  formData.append('messages', JSON.stringify([
    { role: 'system', content: 'Be precise and concise.' },
    { role: 'user', content: message }
  ]));
  
  if (image) {
    formData.append('image', image, 'image.jpg');
  }

  return axios.post(
    'https://api.perplexity.ai/chat/completions',
    formData,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );
}
