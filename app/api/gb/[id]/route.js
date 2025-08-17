import {connectDB} from "@/app/util/database";
import {NextResponse} from "next/server";
let client = await connectDB;
const db = client.db("gb");

export async function GET(req, {params}) {
    const {id} = await params;
    try {
        const result = await db.collection(`gb-articles`).findOneAndUpdate(
            { postId : Number(id) },
            { $inc: { views : 1 } }
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

export async function POST(req, {params}) {
    const {id} = await params;
    const {action, user} = await req.json();
    if (action === "participate") {
        try {
            const result = await db.collection(`gb-articles`).findOneAndUpdate(
                { postId : Number(id) },
                { $addToSet: { participants : user}}
            );
            return NextResponse.json(result)
        } catch (err) {
            console.error(err);
            return NextResponse.json(
                { error : "오류발생" },
                { status : 500 }
            )
        }
    } else if (action === "exit") {
        try {
            const result = await db.collection(`gb-articles`).findOneAndUpdate(
                { postId : Number(id) },
                { $pull: { participants : user}}
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
}

export async function DELETE(req, {params}) {
    const {id} = await params;
    try {
        const result = await db.collection(`gb-articles`).findOneAndDelete(
            { postId : Number(id) }
        )
        return NextResponse.json(result)
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            {error: "오류발생"},
            {status: 500}
        )
    }
}