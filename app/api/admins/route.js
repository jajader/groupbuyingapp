import {connectDB} from "@/app/util/database";
import {NextResponse} from "next/server";
let client = await connectDB;
const db = client.db("gb")

export async function GET() {
    try {
        const result = await db.collection("admins").find().toArray();
        return NextResponse.json(result);
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            {error: "오류 발생"},
            {status: 500}
        )
    }
}