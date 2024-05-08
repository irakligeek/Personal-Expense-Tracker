"use server";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST(req) {
    try {
      const { categories } = await req.json();
      // const { category } = await req.json();

      const model = openai(process.env.AI_MODEL);
      const prompt = `
      Take this array of category names and generate best matching emojies for each, 
      return the result in a valid json file, with category name as key and emoji as a value.
      Return only json file, no text or any other format is allowed.
      Generate as fast as possible.
      generated json must start with "{" and end with "}"
      Here is the array of categories: "${categories}"`;
      // const prompt = `Generate one best matching emoji for this spending category: 
      // ${category} if you can't find a matching emoji, generate random emoji.
      // Return only the emoji in text format. No any other format is allowed. 
      // Generate as fast as possible.`;
      const result = await generateText({
        model,
        prompt,
        system:
          "You are a helpful financial assistant, and have access to user's transactions ",
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
  
      //check if the response is successful and get the text from the result
      if (result && result?.text) {
        return Response.json({ result: result.text });
      }
  
      //return empty response if the result is not successful
      return Response.json({ result: "" });
    } catch (error) {
      console.error(error);
      return Response.json({ error: 'An error occurred while generating text.' });
    }
  }