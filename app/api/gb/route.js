import {connectDB} from "@/app/util/database";
import {NextResponse} from "next/server";
let client = await connectDB;
const db = client.db("gb");

export async function GET(req) {
    try {
        const result = await db.collection(`gb-articles`).find().toArray();
        return NextResponse.json(result)
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "오류발생" },
            { status: 500 }
        );
    }
}

export async function POST(req) {

    try {
        const {content, username, sort, link, name, price} = await req.json();

        const result1 = await db.collection("counters").findOneAndUpdate(
            {name: `gb`},
            { $inc:{ counter : 1 } }
        )
        const result2 = await db.collection(`gb-articles`).insertOne(
            {
                postId: result1.counter,
                content: content,
                author: username,
                sort: sort,
                link: link,
                name: name,
                price: price,
                date: new Date(),
                views: 0,
                gechu: 0,

            }
        )
        return NextResponse.json({
            content
        }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "오류발생" },
            { status: 500 }
        )
    }
}
