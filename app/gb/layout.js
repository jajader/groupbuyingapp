import {DollarSign, Pencil, PenLine} from "lucide-react";
import {connectDB} from "@/app/util/database";

export default function RootLayout({children}) {
    return (
        <div className="flex justify-center">
            <div className="grid xl:w-[960px] w-full grid-cols-4">
                <div className="col-span-4 xl:col-span-4 row-span-7 bg-white w-full">
                    <div className="flex flex-col gap-0">
                        <div className="flex p-4 border-b-[1px] border-gray-300 gap-2 w-full">
                            <DollarSign className="h-16 w-16" strokeWidth={1} size={60}/>
                            <div className="flex justify-between w-full">
                                <div className="flex flex-col gap-1">
                                    <a href="/gb" className="text-[20px] hover:underline">공동구매</a>
                                    <span className="text-[14px]">
                                             공동구매 게시판입니다.</span>
                                </div>
                                <a className="flex place-items-center flex-row px-[6px] py-[3px] h-7.5
                                    outline-[1px] outline-[#cccccc] hover:bg-gray-100"
                                   href="/gb/write">
                                    <PenLine className="mr-[2px]" strokeWidth={2} size={13}/>
                                    <p className="text-[13px] whitespace-nowrap">글쓰기</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 w-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}