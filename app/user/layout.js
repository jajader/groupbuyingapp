import {Pencil, PenLine } from "lucide-react";
import {connectDB} from "@/app/util/database";

export default function RootLayout({children}) {
    return (
        <div className="justify-items-center">
            <div className="grid xl:w-[960px] w-full grid-flow-row grid-cols-4">
                <div className="border-gray-400 col-span-4 xl:col-span-4 row-span-7 bg-white w-full">
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