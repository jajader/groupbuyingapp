import {Pencil, UserRound} from "lucide-react";
import Editor from "@/components/Editor";
import Link from "next/link"
import axios from "axios";
import formatAuthor from "@/components/formatAuthor";
import ArticlesTable from "@/components/articlesTable";
export const dynamic = 'force-dynamic';

axios.defaults.baseURL = process.env.DEFAULT_URL
export default async function freeboard() {
    const result = await axios.get('/api/gb')
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
            <div className="flex flex-col md:hidden visible divide-y-1 border-y-1">
                {articles.map((article) =>
                    <a href={`/gb/${article.postId}`} key={article._id}
                       className="hover:bg-gray-100 p-1 px-2 flex flex-row gap-2">
                        <img className="h-15 w-25 bg-blue-300 rounded-[4px] flex items-center justify-center" src={article.imgurl} alt="미리보기 이미지"/>
                        <div className="flex flex-col gap-[2px] flex-1 min-w-0">
                            <div className="text-[12px] truncate">{article.sort}</div>
                            <div className="text-[15px] truncate">{article.name}</div>
                            <div className="flex flex-row justify-between ">
                                <div className="text-[12px] text-red-500 font-bold">{article.price}원</div>
                                <div className="text-[12px]">{article.author} | {formatDate(article.date)} | 조회수 {article.views}</div>
                            </div>
                        </div>
                    </a>
                )}
            </div>
            <div className="flex-col md:flex hidden divide-y-1 border-y-1">
                {articles.map((article) =>
                    <a href={`/gb/${article.postId}`} key={article._id}
                       className="hover:bg-gray-100 p-1 px-2 flex flex-row gap-2">
                        <img className="h-17 w-30 bg-blue-300 rounded-[4px] flex items-center justify-center" src={article.imgurl} alt="미리보기 이미지"/>
                        <div className="flex flex-col gap-[2px] flex-1 min-w-0">
                            <div className="text-[13px] truncate">{article.sort}</div>
                            <div className="text-[16px] truncate">{article.name}</div>
                            <div className="flex flex-row justify-between">
                                <div className="text-[13px] flex flex-row gap-2">
                                    <div className="text-red-500 font-bold">{article.price}원 </div>
                                    <div className="flex flex-row">| 👤 {article.participants.length}</div>
                                </div>
                                <div className="text-[13px]">{article.author} | {formatDate(article.date)} | 조회수 {article.views}</div>
                            </div>
                        </div>
                    </a>
                )}
            </div>
        </div>
    )
}