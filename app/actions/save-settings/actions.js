"use server";
import { z } from "zod";
import { userId } from "@/app/lib/authentication/user";
import clientPromise from "@/app/lib/mongodb";
import { revalidatePath } from "next/cache";
const DB_NAME = process.env.DB_NAME;

const CategorySchema = z.object({
  name: z.string(),
  color: z.string(),
});
const CategoriesSchema = z.object({
  categories: z.array(CategorySchema),
});
const BudgetSchema = z.object({
  budget: z.number(),
});

export async function saveCategories(prevState, formData) {
  let response = {
    message: "",
    error: false,
  };

  //array of category objects with name and color properties
  let categories = formData.get("categories");

  if (categories) {
    categories = JSON.parse(categories);
  }

  //Add category named other if not present
  const otherCategory = categories.find(
    (category) => category.name.toLowerCase() === "other"
  );
  if (!otherCategory) {
    //color should be gray
    categories.push({ name: "Other", color: "#c2c2c2" });
  }

  // 1 Validate data
  try {
    CategoriesSchema.parse({ categories });
  } catch (error) {
    response = {
      message: error.message,
      error: true,
    };
  }

  //Call ai to get the emojis for the categories
  const emojis = await getAiEmojies(categories);
  //loop through the categories and add the emoji to each category matching the emoji to the category name
  categories = categories.map((category) => {
    const emoji = emojis[category.name];
    return {
      ...category,
      emoji,
    };
  });

  // 2. save data to database
  let result;
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const settings = db.collection("userSettings");
    result = await settings.updateOne(
      { userId: userId },
      { $set: { categories } },
      { upsert: true }
    );

    //set response message if successful
    if (result?.modifiedCount > 0) {
      response = {
        message: "Categories updated successfully!",
        error: false,
      };
    }

    //set response message if failed
    if (!result?.acknowledged) {
      response = {
        message: "An error occurred while updating the categories",
        error: true,
      };
    }
    //set response message if no udpates were made
    if (result?.modifiedCount === 0) {
      response = {
        message: "No changes were made to the categories",
        error: false,
        warning: true,
      };
    }

    if (result?.upsertedCount > 0) {
      response = {
        message: "Categories set successfully!",
        error: false,
      };
    }
  } catch (error) {
    console.error("An error occurred:", error);
    response = {
      message: "An error occurred while updating the categories",
      error: true,
    };
  }

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
    if (result?.modifiedCount > 0) {
      response = {
        message: "Budget updated successfully!",
        error: false,
      };
    }

    //set response message if failed
    if (result?.modifiedCount === 0) {
      response = {
        message: "An error occurred while updating the budget",
        error: true,
      };
    }

    if (result?.upsertedCount > 0) {
      response = {
        message: "Budget set successfully!",
        error: false,
      };
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }

  revalidatePath("/", "layout");

  return response;
}

async function getAiEmojies(categories) {
  //get names key from the categories array
  categories = categories.map((category) => category.name);
  const base_url = process.env.BASE_URL;
  try {
    const response = await fetch(`${base_url}/api/ai/generate-emojis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categories,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const res = await response.json();
    if (!res) {
      throw new Error(res.error);
    }
    if (res?.result) {
      return JSON.parse(res.result);
    }
  } catch (error) {
    console.error(error);
  }
}
