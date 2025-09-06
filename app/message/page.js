import Message from "@/components/message";
import axios from "axios";
import {getSession} from "next-auth/react";
import {getServerSession} from "next-auth";

axios.defaults.baseURL = process.env.DEFAULT_URL;
export default async function message() {
    const result = await axios.get("/api/gb");
    const session = await getServerSession();
    const userPosts = result.data.filter((item) => item.participants.some((participant) => participant === session.user.name));
    return (
        <div>
            <Message list={userPosts}/>
        </div>
    )
}