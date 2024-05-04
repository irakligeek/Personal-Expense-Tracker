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

//Create string schema
const stringSchema = z.string();
//create number schema
const numberSchema = z.number();
//create zod validation for boolean
const booleanSchema = z.boolean();

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const dateStart = searchParams.get("date_start");
  const dateEnd = searchParams.get("date_end");
  const category = searchParams.get("category");
  const dateFrom = new Date(dateStart);
  const year = searchParams.get("year");
  dateFrom.setUTCHours(0, 0, 0, 0); // start of the day in UTC
  const dateTo = new Date(dateEnd);
  dateTo.setUTCHours(23, 59, 59, 999); // end of the day in UTC
  let categories;

  //Get the categories from the userSettings collections from MongoDB
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const userSettings = db.collection(COLLECTION_NAME_USER_SETTINGS);
    const userSettingsData = await userSettings.findOne({ userId: userId });

    if (userSettingsData) {
      categories = userSettingsData.categories.map((cat) => cat.name);
    }
  } catch (error) {
    console.error("Error occurred while user settings: ", error);
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }

  //pass year to the query if it is provided
  if (year) {
    dateFrom.setFullYear(year);
    dateTo.setFullYear(year);
  }
  // Create MongoDB query to get spendings
  let findQurey = {
    userId: userId,
    date: { $gte: dateFrom, $lte: dateTo },
  };

  if (category) {
    //add category to the query if it is provided
    findQurey.category = { $regex: new RegExp("^" + category + "$", "i") };
  } else {
    //Only show spendingg in categories user has defined, if single category is not provided
    if (categories && categories.length > 0) {
      findQurey.category = { $in: categories };
    }
  }

  try {
    const client = await clientPromise;
    const result = await client
      .db(DB_NAME)
      .collection(COLLECTION_NAME_EXPENSES)
      .find(findQurey)
      .sort({ date: -1 })
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

  let { amount, selectedCategory, name, reoccuring, reoccuringFrequency } =
    data;
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

  // validate category
  try {
    const selectedCategoryValidation = stringSchema.parse(selectedCategory);
    if (!selectedCategoryValidation) {
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
    if (!isNaN(nameValidate)) {
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
    const category = selectedCategory;

    try {
      //Make sure the category is one of the categories from the userSettings collection
      const userSettings = db.collection(COLLECTION_NAME_USER_SETTINGS);
      const userSettingsData = await userSettings.findOne({ userId: userId });
      if (userSettingsData) {
        const userCategories = userSettingsData.categories.map(
          (cat) => cat.name
        );
        if (!userCategories.includes(category)) {
          response = {
            message: "Category is not valid",
            error: true,
            field: "category",
          };
          return Response.json({ response });
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      response = {
        message: "An error occurred while adding the expense",
        error: true,
      };
      return Response.json({ response });
    }

    //Check if reoccuring is true, if true save the data to reoccurringExpenses collection
    if (reoccuring === true) {
      //validate reoccuring as boolean
      try {
        const reoccuringValidation = booleanSchema.parse(reoccuring);
        if (!reoccuringValidation) {
          response = {
            message: "Reoccuring must be a boolean",
            error: true,
            field: "reoccuring",
          };
          return Response.json({ response });
        }
      } catch (error) {
        response = {
          message: "Reoccuring must be a boolean",
          error: true,
          field: "reoccuring",
        };
        return Response.json({ response });
      }

      //validate reoccuringFrequency as string if reoccuring is true
      try {
        const reoccuringFrequencyValidation =
          stringSchema.parse(reoccuringFrequency);
        if (!reoccuringFrequencyValidation) {
          response = {
            message: "Reoccuring frequency is required and must be a string",
            error: true,
            field: "reoccuringFrequency",
          };
          return Response.json({ response });
        }
      } catch (error) {
        response = {
          message: "Reoccuring frequency is required",
          error: true,
          field: "reoccuringFrequency",
        };
        return Response.json({ response });
      }

      //save to reoccurringExpenses collection if reoccuring is true
      const reoccurringExpenses = db.collection(
        COLLECTION_NAME_REOCCURRING_EXPENSES
      );
      db_result = await reoccurringExpenses.insertOne({
        userId: userId,
        amount,
        category,
        name,
        reoccuringFrequency,
        date: new Date(),
      });
    } else {
      //save the data to spendings collection if reoccuring is false
      const expenses = db.collection(COLLECTION_NAME_EXPENSES);
      db_result = await expenses.insertOne({
        userId: userId,
        amount,
        category,
        name,
        date: new Date(),
      });
    }

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
