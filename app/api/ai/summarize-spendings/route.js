"use server";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { userId } from "@/app/lib/authentication/user";
import clientPromise from "@/app/lib/mongodb";

const cacheExpiration = new Date(
  new Date().getTime() + 1000 * 60 * 60 * 24 * 7
); // 7 days

export async function POST(req) {
  try {
    let { spendings, month, year } = await req.json();
    const client = await clientPromise;

    //convert to string
    spendings = JSON.stringify(spendings);
    const model = openai(process.env.AI_MODEL);
    const prompt = `Summarize user's spending for ${month}, ${year} based on the spendings data provided. 
      Be short and precise, a few sentences maximum. 
      Refer user as 'You'. 
      Show the amount in US dollars.
      Here is the array of spendings ${spendings}`;

    //check if the prompt has been generated before in cache
    //make sure the expiration is not passed, expiration contains date object when
    //cache will expire
    const cached = await client
      .db(process.env.DB_NAME)
      .collection(process.env.COLLECTION_NAME_CACHE)
      .findOne({
        userId: userId,
        "openaiSummary.id": prompt,
        // "openaiSummary.expiration": { $gt: new Date() },
      });

    //first check if openaiSummary.expiration is not passed,
    // if passed delete the cache and generate new one ai response

    //if cache is found return the cached result - openaiSummary.value
    if (cached) {
      if (cached.openaiSummary.expiration < new Date()) {
        await client
          .db(process.env.DB_NAME)
          .collection(process.env.COLLECTION_NAME_CACHE)
          .deleteOne({
            userId: userId,
            "openaiSummary.id": prompt,
          });
      } else {
        return Response.json({ result: cached.openaiSummary.value });
      }
    }

    //if no cache found, generate the new ai response
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
      /*
        store the result in cache collection with the name COLLECTION_NAME_CACHE 
        in .env file user current userId as the key, cache as the key and openaiSummary 
        as a field and the result.text as the value
      */
      const dbResult = await client
        .db(process.env.DB_NAME)
        .collection(process.env.COLLECTION_NAME_CACHE)
        .insertOne({
          userId: userId,
          openaiSummary: {
            id: prompt,
            value: result.text,
            expiration: cacheExpiration,
          },
        });

      return Response.json({ result: result.text });
    }

    return Response.json({ error: "An error occurred while generating text." });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "An error occurred while generating text." });
  }
}
