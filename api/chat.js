const axios = require('axios');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { message, image, service, analysisType } = req.body;

      if (!message) {
        console.error('No message provided');
        return res.status(400).json({ error: 'Message is required' });
      }

      console.log('Received message:', message);
      console.log('Received service:', service);
      if (image) {
        console.log('Received image data length:', image.length);
      }

      // Log environment variables (ensure sensitive data is handled appropriately)
      console.log('API Gateway URL:', process.env.API_GATEWAY_URL);
      console.log('OpenAI Model ID:', process.env.OPENAI_MODEL_ID);
      console.log('Perplexity Model ID:', process.env.PERPLEXITY_MODEL_ID);

      // API Gateway call to decrypt the API key
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
      console.log('Decrypt response data:', decryptResponse.data);

      // Use the decrypted key directly from the response
      const decryptedApiKey = decryptResponse.data;  // Since the response is a string

      if (!decryptedApiKey) {
        throw new Error('Decryption failed or key not found in the response.');
      }

      let aiResponse;

      switch (service) {
        case 'openai-vision':
          if (!image) {
            throw new Error('Image is required for vision analysis');
          }
          aiResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: "gpt-4",
              messages: [
                {
                  role: "user",
                  content: [
                    { type: "text", text: message },
                    {
                      type: "image_url",
                      image_url: {
                        url: image
                      }
                    }
                  ]
                }
              ],
              max_tokens: 300
            },
            {
              headers: {
                Authorization: `Bearer ${decryptedApiKey}`,
                'Content-Type': 'application/json',
              },
            }
          );
          break;
        case 'openai':
        default:
          // This is the original GPT-3.5 implementation
          aiResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: process.env.OPENAI_MODEL_ID || 'gpt-4',
              messages: [{ role: 'user', content: message }],
            },
            {
              headers: {
                Authorization: `Bearer ${decryptedApiKey}`,
                'Content-Type': 'application/json',
              },
            }
          );
          break;
        // Add cases for other AI services (anthropic, perplexity, etc.) here if needed
      }

      console.log('OpenAI response status:', aiResponse.status);
      console.log('OpenAI response data:', aiResponse.data);

      // Herakles configuration (assuming this is how it was set up before)
      const heraklesResponse = aiResponse.data.choices[0].message.content;

      res.json({ response: heraklesResponse });
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
