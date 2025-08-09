import {Pencil} from "lucide-react";
import Editor from "@/components/Editor";
import Link from "next/link"
import axios from "axios";
import {redirect} from "next/navigation";
export const dynamic = 'force-dynamic';

axios.defaults.baseURL = "http://localhost:3000"
export default async function freeboard() {
    const result = await axios.get('/api/freeboard')
    const articles = result.data.reverse()
    const formatDate = (date) => {
        const dateObj = new Date(date);
        const today = new Date();

        if ((today-dateObj)/(1000*24*60*60)<1) {
            return dateObj.toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hourCycle: "h23"
            });
        } else {
            return dateObj.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            });
        }
    };

    return (
        <div>
            <table className="w-full table-auto">
                <thead className="border-b-2">
                <tr className="text-[13px]">
                    <th className="p-[6px] w-[90px]">번호</th>
                    <th className="text-left w-[480px]">제목</th>
                    <th className="text-left w-[105px]">작성자</th>
                    <th className="w-[90px]">작성일</th>
                    <th className="w-[45px]">조회수</th>
                    <th className="w-[45px]">추천</th>
                </tr>
                </thead>
                <tbody>
                {articles.map((article) =>
                        <tr className="border-b-1 hover:bg-gray-100" key={article._id}>
                                <td className="p-[8px] text-center text-[13px]">{article.postId}</td>
                                <td className="text-[14px] max-w-[480px] truncate">
                                    <Link href={`/freeboard/${article.postId}`}>
                                        {article.title}
                                    </Link>
                                </td>
                                <td className="text-[13px]"></td>
                                <td className="text-center text-[13px]">{formatDate(article.date)}</td>
                                <td className="text-center text-[13px]">{article.views}</td>
                                <td className="text-center text-[13px]">{article.gechu}</td>
                        </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}