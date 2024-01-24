import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import 'dotenv/config';
const app = express();
const PORT = 5050;

console.log('api key', process.env.OPENAI_API_KEY);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());
app.use(cors());

app.post('/api/generate', async (req, res) => {
  console.log('test');

  if (!openai.apiKey) {
    res.status(500).json({
      error: {
        message: 'OpenAI API key not configured',
      },
    });
  }

  const animal = req.body.animal || '';

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', // or another model name
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant.',
      },
      {
        role: 'user',
        content: `suggest three pet names for the following ${animal}`,
      },
    ],
  });
  console.log('response', response)
  res.status(200).json({ result: response.choices[0].message });
});

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
