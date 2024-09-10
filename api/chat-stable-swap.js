const axios = require('axios');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { message } = req.body;

      if (!message) {
        console.error('No message provided');
        return res.status(400).json({ error: 'Message is required' });
      }

      console.log('Received message:', message);

      // Log environment variables (ensure sensitive data is handled appropriately)
      console.log('API Gateway URL:', process.env.API_GATEWAY_URL);
      console.log('OpenAI Model ID:', process.env.OPENAI_MODEL_ID);

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

      console.log('OpenAI response status:', openaiResponse.status);
      console.log('OpenAI response data:', openaiResponse.data);

      res.json({ response: openaiResponse.data.choices[0].message.content });
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

// chat.js

const video = document.getElementById('video');
const photoViewer = document.getElementById('photoViewer');
const captureBtn = document.getElementById('captureBtn');
const analyzeBtn = document.getElementById('analyzeBtn');
const result = document.getElementById('result');
const textExtraction = document.getElementById('textExtraction');
const autoSuggestions = document.getElementById('autoSuggestions');
const viewToggle = document.getElementById('viewToggle');
let stream;
let imageData;

// Initialize camera
async function initCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        video.srcObject = stream;
    } catch (err) {
        console.error("Error accessing the camera:", err);
        result.textContent = "Error: Unable to access the camera. Please make sure you've granted the necessary permissions.";
    }
}

// Capture the image
function captureImage() {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    imageData = canvas.toDataURL('image/jpeg');
    photoViewer.src = imageData;
    photoViewer.style.display = 'block';
    video.style.display = 'none';
    result.textContent = "Image captured. Click 'Super Vision' to analyze.";
}

// Analyze the image based on selected analysis type
async function analyzeImage(analysisType, developerMessage = '') {
    if (!imageData) {
        result.textContent = "Please capture an image first.";
        return;
    }
    result.textContent = "Analyzing image...";
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                analysisType,
                message: `Analyze this image: ${developerMessage}`,
                image: imageData
            }),
        });
        const data = await response.json();
        result.textContent = "Super Vision says: " + data.message;
    } catch (error) {
        console.error('Error:', error);
        result.textContent = "An error occurred during analysis. Please try again.";
    }
}

// Toggle view between video and photo
function toggleView() {
    if (video.style.display === 'none') {
        video.style.display = 'block';
        photoViewer.style.display = 'none';
    } else {
        video.style.display = 'none';
        photoViewer.style.display = 'block';
    }
}

// Handle auto-suggestion button clicks
function handleAutoSuggestion(suggestion) {
    let developerMessage = '';
    switch (suggestion) {
        case 'Description':
            developerMessage = "Describe the image in 150 characters and add a haiku.";
            break;
        case 'Extract Text':
            developerMessage = "Extract any visible text from the image.";
            break;
        case 'Social Post':
            developerMessage = "Generate a social media post tailored for LinkedIn.";
            break;
        case 'Web Search':
            developerMessage = "Generate relevant search queries based on the image.";
            break;
        case 'Explain':
            developerMessage = "Provide an in-depth explanation of the image’s subject.";
            break;
        case 'Prompt':
            developerMessage = "Create a prompt for generating an image with MidJourney or DALL-E.";
            break;
        default:
            developerMessage = "Provide a general description of the image.";
    }

    analyzeImage(suggestion.toLowerCase(), developerMessage);
}

// Set up event listeners
window.addEventListener('load', () => {
    initCamera();
});

captureBtn.addEventListener('click', captureImage);
analyzeBtn.addEventListener('click', () => {
    const analysisType = document.getElementById('analysisType').value;
    analyzeImage(analysisType);
});
viewToggle.addEventListener('click', toggleView);

// Generate auto-suggestions dynamically
const suggestions = ["Description", "Extract Text", "Social Post", "Web Search", "Explain", "Prompt"];
autoSuggestions.innerHTML = suggestions.map(suggestion =>
    `<button class="button suggestion-btn" onclick="handleAutoSuggestion('${suggestion}')">${suggestion}</button>`
).join('');

const axios = require('axios');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { message, image } = req.body;

      if (!message || !image) {
        console.error('No message or image provided');
        return res.status(400).json({ error: 'Message and image are required' });
      }

      console.log('Received message:', message);
      console.log('Received image data length:', image.length); // Ensure image data is passed

      // Log environment variables (ensure sensitive data is handled appropriately)
      console.log('API Gateway URL:', process.env.API_GATEWAY_URL);
      console.log('OpenAI Model ID:', process.env.OPENAI_MODEL_ID);

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

      console.log('OpenAI response status:', openaiResponse.status);
      console.log('OpenAI response data:', openaiResponse.data);

      res.json({ response: openaiResponse.data.choices[0].message.content });
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

