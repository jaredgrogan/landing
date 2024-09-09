// server.js

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Existing routes and functions
// Add your existing functions here, keeping them intact.
// For example: 
// app.get('/some-endpoint', (req, res) => {
//     // Your existing logic here
// });

// GPT-4V Image Analysis API Call
app.post('/api/chat', async (req, res) => {
    const { analysisType, message, image } = req.body;

    // Ensure the message always includes Herakles and the haiku formatting for "Description"
    let developerMessage = message;
    if (analysisType === 'description') {
        developerMessage = `Herakles: Describe the image in 150 characters and add a haiku - labeled as such (begins with "**Haiku:**" and the haiku is in *italics*).`;
    }

    try {
        // Make the GPT-4V API request
        const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4v',
                messages: [
                    {
                        role: 'system',
                        content: `The AI must always refer to itself as Herakles. Analyze the image as requested by the user.`
                    },
                    {
                        role: 'user',
                        content: `Analysis type: ${analysisType}. ${developerMessage}`
                    },
                    {
                        role: 'user',
                        content: `Image data: ${image}`
                    }
                ]
            })
        });

        const data = await gptResponse.json();
        
        // Handle GPT-4V's response and return to the front-end
        if (data.choices && data.choices.length > 0) {
            res.json({ message: `Herakles says: ${data.choices[0].message.content}` });
        } else {
            res.status(500).json({ error: "Failed to generate a response from Herakles." });
        }

    } catch (error) {
        console.error('Error analyzing image:', error);
        res.status(500).json({ error: 'Failed to analyze the image.' });
    }
});

// Error handling for other routes
app.use((req, res, next) => {
    res.status(404).send("Sorry, that route doesn't exist.");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
