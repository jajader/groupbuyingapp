'use client'
import {useSession} from "next-auth/react";
import ChatForm from "@/components/ChatForm";
import {useEffect, useState} from "react";
import ChatMessage from "@/components/ChatMessage";
import {socket} from "@/lib/socketClient";

const Home = () => {
    const [messages, setMessages] = useState([]);
    const {data: session, status} = useSession();
    const room = "1"

    useEffect(() => {
        if (!session) return;
        socket.on("message", (data) => {
            setMessages((prev) => [...prev, data]);
        })
        socket.on("user_joined", (message) => {
            setMessages((prev) => [...prev, {sender: "system", message}]);
        })

        socket.emit("join-room", {room, username: session.user.name})

        return () => {
            socket.off("user_joined");
            socket.off("message");
        }
    })
    const handleSendMessage = (message) => {
        if (!session) return;
        const data = { room, message, sender:  session.user.name};
        setMessages((prev) => [...prev, {sender: session.user.name, message}]);
        socket.emit("message", data);
        console.log(message);
    }
    if (!session) return null;
    console.log(messages);
    return (
        <div className="p-4">
            <h1 className="mb-4 text-2xl font-bold">Room: 1</h1>
            <div className="h-[500px] overflow-y-auto p-4 mb-4 bg-gray-200 border-2 rounded-lg">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} sender={msg.sender} message={msg.message} isOwnMessage={msg.sender == session.user.name}/>
                ))}
            </div>
            <ChatForm onSendMessage={handleSendMessage}/>
        </div>
    );
}
export default Home;