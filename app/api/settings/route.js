import clientPromise from "@/app/lib/mongodb";
import { userId } from "@/app/lib/authentication/user";
const { DB_NAME } = process.env;

export async function GET(request) {
//   const searchParams = request.nextUrl.searchParams;
//   const dateStart = searchParams.get("date_start");
  
  try {
    const client = await clientPromise;
    const result = await client
      .db(DB_NAME)
      .collection("userSettings")   
      .findOne({userId: userId});
      
    return Response.json({result});
  } catch (error) {
    console.error("Error occurred while getting spendings: ", error);
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }
}
