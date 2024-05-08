"use server";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST(req) {
  try {
    let { spendings, month, year } = await req.json();

    //convert to string
    spendings = JSON.stringify(spendings);
    const model = openai(process.env.AI_MODEL);
    const prompt = `Summarize user's spending based on the spendings data provided. 
      Be short and precise, a few sentences maximum. 
      Refer user as 'You'. 
      Look for amount, date and categories and find highest spendings
      and provide recommendation on saving. Ignore 'Rent' category as it will always be high.
      Also, include a few emojis to make it more engaging.
      Must include provided month and year in the summary text. Month: ${month} Year: ${year}
      Here is the array of spendings ${spendings}`;
    const result = await generateText({
      model,
      prompt,
      system:
        "You are a helpful financial assistant, and have access to user's transactions and give a summary of the spendings.",
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

    return Response.json({ error: "An error occurred while generating text." });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "An error occurred while generating text." });
  }
}

// Prompt for spending summary
// Summarize user's spending based on the spendings array provided. be short and precise, a few sentences maximum. Look for amount, date and category fields. Here is the array
