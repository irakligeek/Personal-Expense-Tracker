"use server";
import { z } from "zod";
import clientPromise from "@/app/lib/mongodb";
const DB_NAME = process.env.DB_NAME;
import { userId } from "@/app/lib/authentication/user";
import { revalidatePath } from "next/cache";

//Create string schema
const stringSchema = z.string();
//create number schema
const numberSchema = z.number();

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const dateStart = searchParams.get("date_start");
  const dateEnd = searchParams.get("date_end");
  const category = searchParams.get("category");

  let findQurey = {
    userid: userId,
    // amount: { $gt: 0 },
    date: { $gte: dateStart, $lte: dateEnd },
  };
  if (category) {
    //add category to the query if it is provided
    findQurey.category = { $regex: new RegExp("^" + category + "$", "i") };
  }

  try {
    const client = await clientPromise;
    const result = await client
      .db(DB_NAME)
      .collection("spendings")
      .find(findQurey)
      .toArray();

    return Response.json({ result });
  } catch (error) {
    console.error("Error occurred while getting spendings: ", error);
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }
}

//Add expense to the database
export async function POST(request) {
  let response = {
    message: false,
    error: false,
  };
  let db_result;

  // get data from the request
  const data = await request.json();
  let { amount, selectedCategory, name } = data;
  amount = parseFloat(amount);

  //set name to 'Other Current date' if it is not provided
  if (!name) {
    name = "Spending " + new Date().toLocaleDateString();
  }

  // validate amount
  try {
    const amountValidation = numberSchema.parse(amount);
    //check if amount is empty string or negative
    if (amountValidation <= 0) {
      response = {
        message: "Amount cannot be negative or zero",
        error: true,
        field: "amount",
      };
      return Response.json({ response });
    }
  } catch (error) {
    response = {
      message: "Amount is required and cannot be empty",
      error: true,
      field: "amount",
    };
    return Response.json({ response });
  }

  // validate selectedCategory as string
  
  try {
    const selectedCategoryValidation = stringSchema.parse(selectedCategory);
    if(!selectedCategoryValidation){
      response = {
        message: "Category is required",
        error: true,
        field: "category",
      };
      return Response.json({ response });
    }
  } catch (error) {
    response = {
      message: "Category is required",
      error: true,
      field: "category",
    };
    return Response.json({ response });
  }

  // validate name as string
  try {
    //check if name is  string
    const nameValidate = stringSchema.parse(name);
    if(!isNaN(nameValidate)){
      response = {
        message: "Name must be a string or empty",
        error: true,
        field: "name",
      };
      return Response.json({ response });
    }
  } catch (error) {
    response = {
      message: "Name must be a string",
      error: true,
      field: "name",
    };
    return Response.json({ response });
  }

  // 2. save data to MongoDB database
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const expenses = db.collection("spendings");
    db_result = await expenses.insertOne({
      userId: userId,
      amount,
      selectedCategory,
      name,
      date: new Date(),
    });

    //set success message if mongodb data is saved successfully
    if (db_result.insertedId) {
      response = {
        message: "Expense added successfully",
        error: false,
      };
      // 3. revalidate the cache layout
      revalidatePath("/", "layout");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    response = {
      message: "An error occurred while adding the expense",
      error: true,
    };
  }

  return Response.json({ response });
}
