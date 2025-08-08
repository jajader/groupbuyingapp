import {Pencil, PenLine } from "lucide-react";
import {connectDB} from "@/app/util/database";

export default function RootLayout({children}) {
    return (
        <div>
            <div>
                <div className="justify-items-center">
                    <div className="grid h-[1200px] w-[1280px] grid-flow-row grid-cols-4 bg-gray-100">
                        <div className="border-l-[1px] border-r-[1px] border-gray-400 col-span-4 xl:col-span-3 row-span-7 bg-white">
                            <div className="flex flex-col gap-0">
                                <div className="flex p-4 border-b-[1px] border-gray-300 gap-2">
                                    <Pencil className="h-16 w-16" strokeWidth={1} size={60}/>
                                    <div className="flex w-[840px] flex-col gap-1">
                                        <a href="/freeboard" className="text-[20px] hover:underline">자유게시판</a>
                                        <span className="text-[14px]">
                                    자유로운 게시판입니다.</span>
                                    </div>
                                    <a className="flex place-items-center flex-row px-[6px] py-[3px] h-7.5
                                    float-right outline-[1px] outline-[#cccccc] hover:bg-gray-100"
                                    href="/freeboard/write">
                                        <PenLine className="mr-[2px]" strokeWidth={2} size={13}/>
                                        <p className="text-[13px] whitespace-nowrap">글쓰기</p>
                                    </a>
                                </div>
                            </div>
                            <div className="p-3 w-full">
                                {children}
                            </div>
                        </div>
                        <div className="invisible xl:visible border-[1px] border-gray-400 rounded-lg row-span-1 m-3 mb-1.5 bg-white"></div>
                        <div className="invisible xl:visible border-[1px] border-gray-400 rounded-lg row-span-1 m-3 mt-1.5 bg-white"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}