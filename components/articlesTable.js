'use client'
import formatAuthor from "@/components/formatAuthor";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function ArticlesTable({articles, boardname}) {
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
    const router = useRouter();

    return (
        <div>
            <div className="flex flex-col md:hidden visible divide-y-1 border-y-1">
                {articles.map((article) =>
                    <a href={`/${boardname}/${article.postId}`} key={article._id}
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
            <table className="w-full table-auto md:visible invisible">
                <thead className="border-b-2">
                <tr className="text-[13px]">
                    <th className="p-[6px] w-[90px]">번호</th>
                    <th className="text-left w-[450px]">제목</th>
                    <th className="text-left w-[105px]">작성자</th>
                    <th className="w-[90px]">작성일</th>
                    <th className="w-[60px]">조회수</th>
                    <th className="w-[60px]">추천</th>
                </tr>
                </thead>
                <tbody>
                {articles.map((article) =>
                    <tr className="border-b-1 hover:bg-gray-100 hover:cursor-pointer" key={article._id} onClick={() => router.push(`/${boardname}/${article.postId}`)}>
                        <td className="p-[8px] text-center text-[13px]">{article.postId}</td>
                        <td className="text-[14px] max-w-[480px] truncate">{article.title}</td>
                        <td className="text-[13px] truncate">{formatAuthor(article.author, article.hidename, article.hideor)}</td>
                        <td className="text-center text-[13px] truncate">{formatDate(article.date)}</td>
                        <td className="text-center text-[13px]">{article.views}</td>
                        <td className="text-center text-[13px]">{article.gechu}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}
