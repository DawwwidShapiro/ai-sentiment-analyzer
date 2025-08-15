
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';
import { Sentiment } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const sentimentSchema = {
    type: Type.OBJECT,
    properties: {
        sentiment: {
            type: Type.STRING,
            enum: Object.values(Sentiment),
            description: 'The determined sentiment of the text.'
        },
        confidence: {
            type: Type.NUMBER,
            description: 'The confidence score of the sentiment analysis, from 0.0 to 1.0.'
        },
        explanation: {
            type: Type.STRING,
            description: 'A brief, one-sentence explanation for the sentiment classification.'
        }
    },
    required: ['sentiment', 'confidence', 'explanation']
};


export const analyzeSentiment = async (text: string): Promise<AnalysisResult> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: {
                parts: [{ 
                    text: `You are an expert sentiment analysis AI. Analyze the following text and determine if its sentiment is POSITIVE, NEGATIVE, or NEUTRAL. Provide a confidence score for your determination and a brief, one-sentence explanation. Respond only in the JSON format defined by the schema.

Text to analyze: "${text}"` 
                }]
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: sentimentSchema,
                temperature: 0.2
            },
        });

        const jsonString = response.text.trim();
        const parsedResult = JSON.parse(jsonString) as AnalysisResult;

        // Validate the sentiment value from the API
        if (!Object.values(Sentiment).includes(parsedResult.sentiment)) {
             throw new Error(`Invalid sentiment value received from API: ${parsedResult.sentiment}`);
        }

        return parsedResult;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get sentiment analysis from Gemini API.");
    }
};
