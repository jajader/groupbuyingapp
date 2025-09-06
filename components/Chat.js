'use client'
import {useEffect, useRef, useState} from "react";
import {useSession} from "next-auth/react";
import {socket} from "@/lib/socketClient";
import ChatMessage from "@/components/ChatMessage";
import ChatForm from "@/components/ChatForm";

export default function Chat({roomnum}) {
    const [messages, setMessages] = useState([]);
    const {data: session, status} = useSession();
    const [joined, setJoined] = useState(false);
    const room = roomnum;
    const scrollRef = useRef(null);

    useEffect(() => {
        if (!session) return;
        socket.on("message", (data) => {
            setMessages((prev) => [...prev, data]);
        })
        socket.on("user_joined", (message) => {
            setMessages((prev) => [...prev, {sender: "system", message}]);
        })

        if (!joined) {
            socket.emit("join-room", {room, username: session.user.name})
            setJoined(true)
        }

        return () => {
            socket.off("user_joined");
            socket.off("message");
        }
    })
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

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
        <div className="w-full h-full">
            <div className="p-4 h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 bg-gray-200 border-2 rounded-lg" ref={scrollRef}>
                    {messages.map((msg, index) => (
                        <ChatMessage key={index} sender={msg.sender} message={msg.message} isOwnMessage={msg.sender == session.user.name}/>
                    ))}
                </div>
                <ChatForm onSendMessage={handleSendMessage}/>
            </div>
        </div>
    );
}