'use server';
import { z } from "zod";
import { userId } from "@/app/lib/authentication/user";
import clientPromise from "@/app/lib/mongodb";
import { revalidatePath } from "next/cache";
const DB_NAME = process.env.DB_NAME;

// const NameAndCategories = z.object({
//     budget: z.string(),
//   });
export async function addExpense(prevState, formData) {
    let response = {
      message: "",
      error: false,
    };
  
    // // 1. validate data
    const amount = parseFloat(formData.get("amount"));
    const category = formData.get("selectedCategory");
    const name = formData.get("name");
  
    // if (!amount || !category) {
    //   response = {
    //     message: "Amount and category are required",
    //     error: true,
    //   };
    // }
  
    // // 2. save data to MongoDB database
    // let result;
    // try {
    //   const client = await clientPromise;
    //   const db = client.db(DB_NAME);
    //   const expenses = db.collection("expenses");
    //   result = await expenses.insertOne({
    //     userId: userId,
    //     amount,
    //     category,
    //     name,
    //     date: new Date(),
    //   });
  
    //   //set response message if successful
    //   if (result?.acknowledged) {
    //     response = {
    //       message: "Expense added successfully!",
    //       error: false,
    //     };
    //   }
  
    //   //set response message if failed
    //   if (!result?.acknowledged) {
    //     response = {
    //       message: "An error occurred while adding the expense",
    //       error: true,
    //     };
    //   }
    // } catch (error) {
    //   console.error("An error occurred:", error);
    //   response = {
    //     message: "An error occurred while adding the expense",
    //     error: true,
    //   };
    // }
  
    // return response;
  
  }