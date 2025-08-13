import {connectDB} from "@/app/util/database";
import {NextResponse} from "next/server";
let client = await connectDB;
const db = client.db("gb");

export async function GET(req, {params}) {
    const {boardname, id} = await params;
    try {
        const result = await db.collection(`${boardname}-articles`).findOne(
            { postId : Number(id) }
        );
        return NextResponse.json(result)
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error : "오류발생" },
            { status : 500 }
        )
    }
}