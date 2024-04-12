"use server";
import { z } from 'zod';

const CategorySchema = z.object({
  name: z.string(),
  color: z.string(),
});

const SettingsSchema = z.object({
  budget: z.number().int(),
  categories: z.array(CategorySchema),
});


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
    response =  {
      message: error.message,
      error: true,
    };
  }

  console.log('response', response);
  
  // 2. save data to database

  // 2. return success message or error message based on the result

  //test
  return response;
}
