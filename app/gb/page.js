import {Pencil} from "lucide-react";
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
                       className="hover:bg-gray-100 h-max p-1 px-2">
                        <div className="flex flex-col gap-[2px]">
                            <div className="text-[14px] truncate">{article.title}</div>
                            <div className="text-[14px] flex flex-row justify-between">
                                <div className="text-[13px]">{formatAuthor(article.author, article.hidename, article.hideor)}</div>
                                <div className="text-[12px]">{formatDate(article.date)} | 조회수 {article.views} | 추천 {article.gechu}</div>
                            </div>
                        </div>
                    </a>
                )}
            </div>
            <div className="flex-col md:flex hidden divide-y-1 border-y-1">
                {/*articles.map((article) =>
                    <a href={`/gb/${article.postId}`} key={article._id}
                       className="hover:bg-gray-100 h-max p-1 px-2">
                        <div className="flex flex-col gap-[2px]">
                            <div className="text-[14px] truncate">{article.title}</div>
                            <div className="text-[14px] flex flex-row justify-between">
                                <div className="text-[13px]">{formatAuthor(article.author, article.hidename, article.hideor)}</div>
                                <div className="text-[12px]">{formatDate(article.date)} | 회수 {article.views} | 추천 {article.gechu}</div>
                            </div>
                        </div>
                    </a>
                )*/}
                <a href={`/gb/`} key={1}
                   className="hover:bg-gray-100 p-1 px-2 flex flex-row gap-2">
                    <div className="h-17 w-32 bg-blue-300 rounded-[4px] flex items-center justify-center">
                        <p>이미지</p>
                    </div>
                    <div className="flex flex-col gap-[2px] w-full">
                        <div className="text-[13px] truncate">추가 정보</div>
                        <div className="text-[16px] truncate">제목</div>
                        <div className="flex flex-row justify-between">
                            <div className="text-[13px]">저자</div>
                            <div className="text-[13px]">날짜 조회수 추천</div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}