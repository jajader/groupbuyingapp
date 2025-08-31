import {Pencil, PenLine } from "lucide-react";
import {connectDB} from "@/app/util/database";

export default function RootLayout({children}) {
    return (
        <div className="justify-items-center">
            <div className="grid min-h-screen xl:w-[1280px] w-full grid-flow-row grid-cols-4 bg-gray-100">
                <div className="border-l-[1px] border-r-[1px] border-gray-400 col-span-4 xl:col-span-3 row-span-7 bg-white w-full">
                    {children}
                </div>
                <div className="invisible xl:visible border-[1px] border-gray-400 rounded-lg row-span-1 m-3 mb-1.5 bg-white">
                </div>
                <div className="invisible xl:visible border-[1px] border-gray-400 rounded-lg row-span-1 m-3 mt-1.5 bg-white">
                </div>
            </div>
        </div>
    )
}