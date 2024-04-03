"use server";
import clientPromise from "./mongodb";
const dbName = "ExpenseTracker";

export async function getUserSettings(userId) {
  try {
    const client = await clientPromise;
    const result = await client
      .db(dbName)
      .collection("userSettings")
      .findOne({ userid: userId });
    return result;
  } catch (error) {
    console.error("Error occurred while getting user settings: ", error);
    // You can decide what to return in case of error
    return null;
  } 
}
