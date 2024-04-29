"use server";
// import { z } from "zod";
// import { userId } from "@/app/lib/authentication/user";
// import clientPromise from "@/app/lib/mongodb";
// import { revalidatePath } from "next/cache";
// const DB_NAME = process.env.DB_NAME;

// const schema = z.object({
//   amount: z.number(),
//   selectedCategory: z.string(),
//   name: z.string(),
// });
// export async function addExpense(prevState, formData) {
//   let response = {
//     message: false,
//     error: false,
//   };

//   // 1. validate data
//   let { amount, selectedCategory, name } = formData;
//   amount = parseFloat(amount);

//   const result = schema.safeParse({
//     amount,
//     selectedCategory,
//     name,
//   });

//   let db_result;
//   if (!result.success) {
//     response = {
//       message: result.error.message,
//       error: true,
//     };
//   } else {
//     // 2. save data to MongoDB database
//     try {
//       const client = await clientPromise;
//       const db = client.db(DB_NAME);
//       const expenses = db.collection("spendings");
//       db_result = await expenses.insertOne({
//         userId: userId,
//         amount,
//         selectedCategory,
//         name,
//         date: new Date(),
//       });

//       //set success message if mongodb data is saved successfully
//       if (db_result.insertedId) {
//         response = {
//           message: "Expense added successfully",
//           error: false,
//         };
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//       response = {
//         message: "An error occurred while adding the expense",
//         error: true,
//       };
//     }

//     // 3. revalidate the cache layout
//     revalidatePath("/", "layout");
//   }
  
//   return response;
// }
