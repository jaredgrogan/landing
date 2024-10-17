const axios = import('axios');
const FormData = import('form-data');
const fs = import('fs');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { message, analysisType, image, audio, service } = req.body;

      if (!message && !image && !audio) {
        console.error('No input provided');
        return res.status(400).json({ error: 'Message, image, or audio is required' });
      }

      console.log('Received request:', { message, analysisType, image: !!image, audio: !!audio, service });

      // Log environment variables (ensure sensitive data is handled appropriately)
      console.log('API Gateway URL:', process.env.API_GATEWAY_URL);
      console.log('OpenAI Model ID:', process.env.OPENAI_MODEL_ID);

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

      console.log('Decrypt response status:', decryptResponse.status);

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
          aiResponse = await handleOpenAIVision(message, image, analysisType, decryptedOpenAIApiKey);
          break;
        case 'openai-audio':
          aiResponse = await handleOpenAIAudio(audio, decryptedOpenAIApiKey);
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
      console.log('AI response data:', aiResponse.data);

      res.json({ response: aiResponse.data.choices ? aiResponse.data.choices[0].message.content : aiResponse.data.output });
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
      model: process.env.OPENAI_MODEL_ID || 'gpt-4-turbo',
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
  let developerMessage = message;
  if (analysisType === 'description') {
    developerMessage = `Herakles: Describe the image in 150 characters and add a haiku - labeled as such (begins with "**Haiku:**" and the haiku is in italics).`;
  }
  return axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4-turbo',
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

async function handleOpenAIAudio(audio, apiKey) {
  const formData = new FormData();
  formData.append('file', fs.createReadStream(audio));
  formData.append('model', 'whisper-1');

  return axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
    headers: {
      ...formData.getHeaders(),
      'Authorization': `Bearer ${apiKey}`,
    },
  });
}

async function handlePerplexity(message, apiKey) {
  return axios.post(
    'https://api.perplexity.ai/chat/completions',
    {
 body: '{"model":"llama-3.1-sonar-small-128k-online","messages":[{"role":"system","content":"Be precise and concise."},{"role":"user","content":"How many stars are there in our galaxy?"}],"max_tokens":"Optional","temperature":0.2,"top_p":0.9,"return_citations":true,"search_domain_filter":["perplexity.ai"],"return_images":false,"return_related_questions":false,"search_recency_filter":"month","top_k":0,"stream":false,"presence_penalty":0,"frequency_penalty":1}'
};
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
