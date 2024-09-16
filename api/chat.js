// api/chat.js (Server-side code)

const cors = require('cors');
const axios = require('axios');

const corsOptions = {
  origin: function (origin, callback) {
    if(!origin) return callback(null, true);
    const allowedOrigins = ['http://localhost:3000', 'https://your-vercel-app.vercel.app'];
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
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
        image: aiResponse.data.image // Include image data if present
      });
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

// Client-side JavaScript (to be included in your HTML file)

const urlInput = document.getElementById('urlInput');
const goButton = document.getElementById('goButton');
const browserFrame = document.getElementById('browserFrame');
const aiButtons = document.querySelectorAll('.ai-button');
const aiThinking = document.getElementById('aiThinking');
const resultDisplay = document.getElementById('resultDisplay');

function loadUrl() {
  const url = urlInput.value.trim();
  if (url) {
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
    browserFrame.src = proxyUrl;
  }
}

urlInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    loadUrl();
  }
});

goButton.addEventListener('click', loadUrl);

async function getIFrameContent() {
  return new Promise((resolve, reject) => {
    try {
      browserFrame.onload = () => {
        try {
          const iframeContent = browserFrame.contentWindow.document.body.innerText || 
                                browserFrame.contentWindow.document.body.textContent;
          resolve(iframeContent);
        } catch (error) {
          // If we can't access the content directly, use a server-side proxy
          fetch(`/api/proxy?url=${encodeURIComponent(browserFrame.src)}&getContent=true`)
            .then(response => response.text())
            .then(resolve)
            .catch(reject);
        }
      };
    } catch (error) {
      reject(error);
    }
  });
}

async function sendToAI(action) {
  const content = await getIFrameContent();
  if (!content) {
    displayError('Unable to retrieve content. Please ensure the page has loaded.');
    return;
  }

  aiThinking.style.display = 'block';
  resultDisplay.style.display = 'none';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `${action}: ${content}`,
        service: 'openai' // or 'perplexity' for Perplexity requests
      })
    });
    
    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    
    aiThinking.style.display = 'none';
    resultDisplay.style.display = 'block';
    
    if (data && data.response) {
      if (typeof data.response === 'string') {
        resultDisplay.textContent = data.response;
      } else if (data.image) {
        // Handle image response
        const img = document.createElement('img');
        img.src = data.image;
        resultDisplay.innerHTML = '';
        resultDisplay.appendChild(img);
      }
    } else {
      throw new Error('Received an unexpected response format.');
    }
  } catch (error) {
    console.error('Error sending to AI:', error);
    displayError('An error occurred while processing your request. Please try again.');
  }
}

function displayError(message) {
  aiThinking.style.display = 'none';
  resultDisplay.style.display = 'block';
  resultDisplay.textContent = message;
}

aiButtons.forEach(button => {
  button.addEventListener('click', () => sendToAI(button.dataset.action));
});

// Initial load
loadUrl('https://www.example.com');
