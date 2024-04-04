import clientPromise from "@/app/(dashboard)/lib/mongodb";
const dbName = "ExpenseTracker";
const userId = "ika05010"; //This will be passed coming from the login session

export async function GET(request) {
//   const searchParams = request.nextUrl.searchParams;
//   const dateStart = searchParams.get("date_start");
  
  try {
    const client = await clientPromise;
    const result = await client
      .db(dbName)
      .collection("userSettings")   
      .findOne({userid: userId});
      
    return Response.json({result});
  } catch (error) {
    console.error("Error occurred while getting spendings: ", error);
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }
}
