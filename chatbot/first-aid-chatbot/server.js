import express from 'express';
import bodyParser from 'body-parser';
import nodeFetch from 'node-fetch';
import cors from 'cors'; // Import the cors middleware
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const port = 4000;

app.use(express.static('public'));
app.use(bodyParser.json());

// Use the cors middleware to enable CORS
app.use(cors());

app.post('/api/chat', async (req, res) => {
  const { userMessage } = req.body;
    // const something = "AIzaSyB5nMBW3T93c35qpo54vjyvZIugDTc-xCQ";
    // const something2 = ""
  const genAI = new GoogleGenerativeAI("AIzaSyCD35M6Tv6ltN5PT_FJIpeZ_asGu0MsUFQ");
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});


  const result = await model.generateContent( userMessage);
  const response = await result.response;
  const text = response.text();


//   // Simulate OpenAI API call (replace with actual OpenAI API call)
//   const openaiResponse = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer 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',
//     },
//     body: JSON.stringify({
//       prompt: userMessage,
//       max_tokens: 100,
//     }),
//   });

//   const { choices } = await openaiResponse.json();
//   console.log(choices);
//   const botResponse = Array.isArray(choices) && choices.length > 0
//     ? choices[0].text || "I'm sorry, I couldn't understand that."
//     : "I'm sorry, I couldn't understand that.";

const botResponse = text ?? `I'm sorry, I couldn't understand that.`;

  res.json({ botResponse });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
