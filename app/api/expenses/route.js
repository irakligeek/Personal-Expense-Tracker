import clientPromise from "@/app/(dashboard)/lib/mongodb";
const dbName = "ExpenseTracker";
const userId = "ika05010"; //This will be passed coming from the login session
import { revalidatePath } from "next/cache";
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
      .db(dbName)
      .collection("spendings")
      .find(findQurey)
      .toArray();

    return Response.json({result});
  } catch (error) {
    console.error("Error occurred while getting spendings: ", error);
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }
}
