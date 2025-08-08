import {connectDB} from "@/app/util/database";
import {NextResponse} from "next/server";
let client = await connectDB;
const db = client.db("gb");

export async function GET() {
    try {
        const result = await db.collection("freeboard-articles").find().toArray();
        console.log(result)
        return NextResponse.json(result)
    } catch (err) {
         console.error(err);
         return NextResponse.json(
             { error: "오류발생" },
             { status: 500 }
         );
    }
}

export async function POST(req, res) {
        try {
            const {title, content} = await req.json();
            const result1 = await db.collection("counters").findOneAndUpdate(
                {name: "freeboard"},
                { $inc:{ counter : 1 } }
            )
                const result2 = await db.collection("freeboard-articles").insertOne(
                    {
                        postId: result1.counter,
                        title: title,
                        content: content,
                        date: new Date(),
                        views: 0,
                        gechu: 0
                    }
                )
                return NextResponse.json({
                    title, content
                }, { status: 200 })
        } catch (error) {
            console.error(error);
            return NextResponse.json(
                { error: "오류발생" },
                { status: 500 }
            )
        }
}
