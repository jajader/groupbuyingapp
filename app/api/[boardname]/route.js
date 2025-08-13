import {connectDB} from "@/app/util/database";
import {NextResponse} from "next/server";
let client = await connectDB;
const db = client.db("gb");

export async function GET(req, {params}) {
    const {boardname} = await params;
    try {
        const result = await db.collection(`${boardname}-articles`).find().toArray();
        return NextResponse.json(result)
    } catch (err) {
         console.error(err);
         return NextResponse.json(
             { error: "오류발생" },
             { status: 500 }
         );
    }
}

export async function POST(req, {params}) {
    const {boardname} = await params;

        try {
            const {title, content, username, hidename, hideor} = await req.json();

            const result1 = await db.collection("counters").findOneAndUpdate(
                {name: `${boardname}`},
                { $inc:{ counter : 1 } }
            )
                const result2 = await db.collection(`${boardname}-articles`).insertOne(
                    {
                        postId: result1.counter,
                        title: title,
                        content: content,
                        author: username,
                        date: new Date(),
                        views: 0,
                        gechu: 0,
                        hidename: hidename,
                        hideor: hideor,
                    }
                )
                return NextResponse.json({
                    title, content, username
                }, { status: 200 })
        } catch (error) {
            console.error(error);
            return NextResponse.json(
                { error: "오류발생" },
                { status: 500 }
            )
        }
}
