import {Pencil, PenLine } from "lucide-react";
import {connectDB} from "@/app/util/database";

export default function RootLayout({children}) {
    return (
        <div className="justify-center flex flex-1">
            {children}
        </div>
    )
}