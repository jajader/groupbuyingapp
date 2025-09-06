'use client'

import {useSession} from "next-auth/react";
import {useState} from "react";
import Chat from "@/components/Chat";

export default function Message({list}) {
    const {data: session, status} = useSession();
    const [isthere, setIsthere] = useState(false);
    const [num, setNum] = useState(0);
    console.log(num)
    if (!session) return null;
    const chatClickHander = (num) => {
        setIsthere(true);
        setNum(num);
    }
    return (
        <div className="grid h-full xl:w-[1280px] w-full grid-flow-row grid-cols-4 border-gray-300 border-l-[1px] border-r-[1px] divide-x-1 divide-gray-300">
            <div className="flex flex-col h-full invisible xl:visible row-span-7 col-span-1 bg-white divide-y-1 divide-gray-300">
                {list.map((item) => (
                    <div key={item.postId} className="h-[100px] p-3 hover:bg-gray-100 hover:cursor-pointer" onClick={() => chatClickHander(item.postId)}>{item.name}</div>
                ))}
            </div>
            <div className="flex border-gray-400 col-span-4 xl:col-span-3 row-span-7 bg-white w-full">
                {isthere ? <Chat roomnum={num}/>
                    : <div className="w-full h-full flex justify-center items-center">
                        <span>아무도 Lumpus와 놀고싶지 않은가봐요.</span>
                    </div>
                }
            </div>
        </div>
    )
}