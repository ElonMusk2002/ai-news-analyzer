// analyze.js

import { GoogleGenerativeAI } from "@google/generative-ai";
import puppeteer from "puppeteer";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const isUrl = (string) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z0-9][-a-z0-9]*[a-z0-9])?\\.)+[a-z]{2,}|" +
      "localhost|" +
      "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|" +
      "\\[([0-9a-f]{1,4}:){7,7}[0-9a-f]{1,4}\\]|" +
      "([0-9a-f]{1,4}:){1,7}:|" +
      "([0-9a-f]{1,4}:){1,6}:[0-9a-f]{1,4}|" +
      "([0-9a-f]{1,4}:){1,5}(:[0-9a-f]{1,4}){1,2}|" +
      "([0-9a-f]{1,4}:){1,4}(:[0-9a-f]{1,4}){1,3}|" +
      "([0-9a-f]{1,4}:){1,3}(:[0-9a-f]{1,4}){1,4}|" +
      "([0-9a-f]{1,4}:){1,2}(:[0-9a-f]{1,4}){1,5}|" +
      "[0-9a-f]{1,4}:((:[0-9a-f]{1,4}){1,6})|" +
      ":((:[0-9a-f]{1,4}){1,7}|:)|" +
      "fe80:(:[0-9a-f]{0,4}){0,4}%[0-9a-zA-Z]{1,}|" +
      "::(ffff(:0{1,4}){0,1}:){0,1}" +
      "(25[0-5]|(2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]))" +
      "(\\.(25[0-5]|(2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]))){3})" +
      "(\\:[0-9]+)?(\\/.*)?$",
    "i"
  );
  return !!pattern.test(string);
};

const extractTextFromUrl = async (url) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    await page.waitForSelector("#mw-content-text");

    const bodyText = await page.evaluate(() => {
      return document.querySelector("#mw-content-text").innerText;
    });

    await browser.close();
    return bodyText;
  } catch (error) {
    console.error("Error extracting text from URL:", error);
    throw error;
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { text, conciseness, detailLevel } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }

  try {
    let inputText = text;

    if (isUrl(text)) {
      console.log("Fetching URL:", text);
      inputText = await extractTextFromUrl(text);
      console.log("Extracted text:", inputText);
    }

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `Analyze the following text and provide:
                1. A summary (conciseness: ${conciseness}/100, detail level: ${detailLevel}/100)
                2. Sentiment analysis (positive, neutral, or negative with a score from 0 to 100)
                3. Key topics with relevance scores
                4. Named entities (people, organizations, locations, etc.)
                5. Readability score (0-100)
                6. Bias detection (left-leaning, center, right-leaning)
                7. Fact check suggestions
                8. Content classification

                Text to analyze:
                ${inputText}

                Format the response as JSON with the following structure:
                {
                  "summary": "...",
                  "sentiment": {
                    "label": "positive/neutral/negative",
                    "score": 0-100,
                    "emotions": [{"label": "...", "color": "..."}]
                  },
                  "topics": [{"name": "...", "relevance": 0-1}],
                  "entities": [{"type": "...", "examples": ["...", "..."]}],
                  "readability": {
                    "score": 0-100,
                    "description": "..."
                  },
                  "bias": {
                    "label": "left-leaning/center/right-leaning",
                    "description": "..."
                  },
                  "factCheckSuggestions": ["...", "..."],
                  "contentClassification": ["...", "..."]
                };`,
            },
          ],
        },
      ],
    };

    const result = await model.generateContent(requestBody);
    const responseText = await result.response.text();
    const cleanedText = responseText
      .replace(/```json/, "")
      .replace(/```/, "")
      .trim();

    const parsedResult = JSON.parse(cleanedText);
    parsedResult.sentiment.emotions = parsedResult.sentiment.emotions.map(
      (emotion) => {
        const colorMap = {
          joy: "yellow",
          sadness: "blue",
          anger: "red",
          fear: "purple",
          surprise: "orange",
          disgust: "green",
          trust: "teal",
          anticipation: "pink",
        };
        return {
          ...emotion,
          color: colorMap[emotion.label.toLowerCase()] || "gray",
        };
      }
    );

    parsedResult.topics = parsedResult.topics.slice(0, 5);

    return res.status(200).json(parsedResult);
  } catch (error) {
    console.error("Error analyzing text:", error);
    return res
      .status(500)
      .json({ message: "Error analyzing text", error: error.message });
  }
}
