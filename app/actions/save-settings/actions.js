"use server";
import { z } from "zod";
import { userId } from "@/app/lib/authentication/user";
import clientPromise from "@/app/lib/mongodb";
import { revalidatePath } from 'next/cache'

const CategorySchema = z.object({
  name: z.string(),
  color: z.string(),
});

const SettingsSchema = z.object({
  budget: z.number().int(),
  categories: z.array(CategorySchema),
});
const BudgetSchema = z.object({
  budget: z.number(),
});

const DB_NAME = process.env.DB_NAME;

export async function saveSettings(prevState, formData) {
  let response = {
    message: "Settings updated successfully!",
    error: false,
  };

  //must be integer
  const budget = parseInt(formData.get("budget"), 10);
  //array of category objects with name and color properties
  let categories = formData.get("categories");
  if (categories) {
    categories = JSON.parse(categories);
  }

  // 1 . validate data
  try {
    SettingsSchema.parse({ budget, categories });
  } catch (error) {
    response = {
      message: error.message,
      error: true,
    };
  }

  console.log("response", response);

  // 2. save data to database

  // 2. return success message or error message based on the result

  //test
  return response;
}

export async function saveBudget(prevState, formData) {
  let response = {
    message: false,
    error: false,
  };

  //must be integer
  const budget = parseInt(formData.get("budget"), 10);

  // 1 . validate data
  try {
    //validate budget schema
    BudgetSchema.parse({ budget });
  } catch (error) {
    response = {
      message: error.message,
      error: true,
    };
  }

  // 2. save data to MongoDB database
  let result;
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const settings = db.collection("userSettings");
    result = await settings.updateOne(
      { userId: userId },
      { $set: { budget } },
      { upsert: true }
    );
    //set response message if successful
    if(result.modifiedCount > 0) {
      response = {
        message: "Budget updated successfully!",
        error: false,
      };
    }

    //set response message if failed
    if(result.modifiedCount === 0) {
      response = {
        message: "An error occurred while updating the budget",
        error: true,
      };
    }

    if(result.upsertedCount > 0) {
      response = {
        message: "Budget set successfully!",
        error: false,
      };
    }

    if(result.upsertedCount === 0) {
      response = {
        message: "An error occurred while setting the budget",
        error: true,
      };
    }
    
  } catch (error) {
    console.error("An error occurred:", error);
  }

  revalidatePath('/', 'layout');

  return response;
}
