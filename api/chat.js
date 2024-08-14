export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const decryptResponse = await axios.post(
        process.env.API_GATEWAY_URL,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

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

      const contentType = openaiResponse.headers['content-type'];
      if (contentType && contentType.indexOf('application/json') === -1) {
        throw new Error(`Received non-JSON response: ${openaiResponse.data.substring(0, 100)}... Status: ${openaiResponse.status}`);
      }

      if (!openaiResponse.data || !openaiResponse.data.choices || !openaiResponse.data.choices[0] || !openaiResponse.data.choices[0].message) {
        throw new Error('Unexpected response from OpenAI API');
      }

      res.json({ response: openaiResponse.data.choices[0].message.content });
    } catch (error) {
      console.error('Error in /api/chat:', error.message);
      res.status(500).json({
        error: 'An error occurred while processing your request',
        details: error.message,
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
