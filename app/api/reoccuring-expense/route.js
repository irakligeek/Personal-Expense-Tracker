"use server";
import { z } from "zod";
import clientPromise from "@/app/lib/mongodb";
import { userId } from "@/app/lib/authentication/user";
import { revalidatePath } from "next/cache";
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME_EXPENSES = process.env.COLLECTION_NAME_EXPENSES;
const COLLECTION_NAME_REOCCURRING_EXPENSES =
  process.env.COLLECTION_NAME_REOCCURRING_EXPENSES;
const COLLECTION_NAME_USER_SETTINGS = process.env.COLLECTION_NAME_SETTINGS;
const { ObjectId } = require("mongodb");

export async function GET(request) {
  // Create MongoDB query to get reoccurring expenses
  let findQuery = {
    userId: userId,
  };

  try {
    const client = await clientPromise;
    const reoccurringExpenses = await client
      .db(DB_NAME)
      .collection(COLLECTION_NAME_REOCCURRING_EXPENSES)
      .find(findQuery)
      .sort({ amount: -1 })
      .toArray();

    return Response.json({ reoccurringExpenses });
  } catch (error) {
    console.error("Error occurred while getting reoccurring expenses: ", error);
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }
}

export async function POST(request) {
  const body = await request.json();
  //parse amount to float 2 decomal
  body.forEach((element) => {
    element.amount = parseFloat(element.amount);
  });
  const schema = z.array(
    z.object({
      name: z.string(),
      amount: z.number(),
      category: z.string(),
      id: z.string(),
    })
  );

  try {
    const client = await clientPromise;
    const results = schema.parse(body);

    const operations = results.map((result) => ({
      updateOne: {
        filter: { _id: new ObjectId(result.id) },
        update: {
          $set: {
            userId: userId,
            name: result.name,
            amount: result.amount,
            category: result.category,
            date: new Date(),
          },
        },
        upsert: true,
      },
    }));

    const response = await client
      .db(DB_NAME)
      .collection(COLLECTION_NAME_REOCCURRING_EXPENSES)
      .bulkWrite(operations);

    revalidatePath("/", "layout");

    return Response.json({ response });
  } catch (error) {
    console.error("Error occurred while adding reoccurring expenses: ", error);
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }
}
