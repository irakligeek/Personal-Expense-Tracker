"use server";
// import { openai } from "@ai-sdk/openai";
import OpenAI from "openai";
const openai = new OpenAI();
import fs from "fs";

// import { generateText } from "ai";

export async function POST(req) {
  try {

    // 1. Create an AI assistant
    const assistant = await createAiAssistant();

    // 2. Upload files to openai vector store
    const filePath = process.cwd() + "/app/data/expenses.json";
    const fileStreams = fs.createReadStream(filePath);

    // Create a vector store including our file/s.
    let vectorStore = await openai.beta.vectorStores.create({
      name: "User's Expenses",
    });

    // Upload the files to the vector store
    const upload = await openai.beta.vectorStores.fileBatches.uploadAndPoll(
      vectorStore.id,
      fileStreams
    );

    //The above call is throwing error, most likely a but from openai sdk
    console.log("upload________", upload);
    

    //Update the assistant to use the new Vector Store
    // await openai.beta.assistants.update(assistant.id, {
    //   tool_resources: { file_search: { vector_store_ids: [vectorStore.id] } },
    // });

    // Create thread
    // const thread = await openai.beta.threads.create({
    //   messages: [
    //     {
    //       role: "user",
    //       content: "How much was my spending in May 2024?",
    //     },
    //   ],
    // });

    // console.log(thread.tool_resources?.file_search);

    return Response.json({ result: "TEST" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "An error occurred while generating text." });
  }
}

const createAiAssistant = async () => {
  const assistant = await openai.beta.assistants.create({
    name: "Personal Financial Bot",
    instructions:
      "you are a helpful financial assistant and have access to user's spendings data presented in the file provided to you. You can provide a summary of the spendings and give recommendations on saving.",
    model: process.env.AI_MODEL,
    tools: [{ type: "file_search" }],
  });

  return assistant;
};
