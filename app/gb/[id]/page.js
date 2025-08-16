import axios from "axios";
import formatAuthor from "@/components/formatAuthor";
import ArticleView from "@/components/articleView";
import {redirect} from "next/navigation";
import EditDelete from "@/components/EditDelete";
import {getSession} from "next-auth/react";
import {getServerSession} from "next-auth";
import ImageUploader from "@/components/ImageUploader";

axios.defaults.baseURL = process.env.DEFAULT_URL
export default async function article({params}) {
    const {id} = await params;
    const result = await axios.get(`/api/gb/${id}`)
    if (!result.data) {
        redirect(`${process.env.DEFAULT_URL}/error`)
    }
    const session = await getServerSession();
    const itsme = (session.user.name === result.data.author)
    return (
        <div>
            {itsme && <EditDelete boardname="gb" articleData={result.data}/>}
            <div className="flex flex-col divide-y border-y divide-[#cccccc] border-[#cccccc]">
                <p className="text-[18px] py-[6px] px-3 bg-gray-200">{result.data.name}</p>
                <div className="flex flex-row text-[14px] py-[3px] px-3 justify-between">
                    <a className="truncate whitespace-nowrap">{result.data.author}</a>
                    <a className="truncate whitespace-nowrap">조회수 {result.data.views} | 추천 {result.data.gechu} | 작성일 {(new Date(result.data.date)).toLocaleDateString("ko-kr", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hourCycle: "h23"
                    })}</a>
                </div>
                <div className="border divide-y border-[#cccccc] divide-[#cccccc] mt-2">
                    <div className="flex flex-row divide-x divide-1 divide-[#cccccc]">
                        <p className="w-25 py-2 text-[14px] flex justify-center">상품명</p>
                        <p className="flex-1 ml-2 py-2 text-[14px] break-all">{result.data.name}</p>
                    </div>
                    <div className="flex flex-row divide-x divide-1 divide-[#cccccc]">
                        <p className="w-25 py-2 text-[14px] flex justify-center">종류</p>
                        <p className="flex-1 ml-2 py-2 text-[14px] break-all">{result.data.sort}</p>
                    </div>
                    <div className="flex flex-row divide-x divide-1 divide-[#cccccc]">
                        <p className="w-25 py-2 text-[14px] flex justify-center">링크</p>
                        <a href={result.data.link} className="flex-1 ml-2 py-2 text-[14px] break-all text-blue-700 hover:underline">{result.data.link}</a>
                    </div>
                    <div className="flex flex-row divide-x divide-1 divide-[#cccccc]">
                        <p className="w-25 py-2 text-[14px] flex justify-center">가격</p>
                        <p className="flex-1 ml-2 py-2 text-[14px] break-all">{result.data.price}원</p>
                    </div>
                    <div className="flex flex-row divide-x divide-1 divide-[#cccccc]">
                        <p className="w-25 py-2 text-[14px] flex justify-center">참여</p>
                        <div className="flex flex-row">
                            {result.data.participants.map((participant) =>
                                <p className="flex-1 ml-2 py-2 text-[14px] break-all">{participant}</p>
                            )}
                            {result.data.participants.map((participant) =>
                                <p className="flex-1 ml-2 py-2 text-[14px] break-all">{participant}</p>
                            )}
                        </div>

                    </div>
                </div>
                <div>
                    <div className="px-[13px] py-[3px]">
                        <img src="/assets/file.svg" alt="Sejong" className="max-h-120"/>
                    </div>
                    <div className="px-[13px] py-[3px] min-h-[200px] break-all" dangerouslySetInnerHTML={{ __html: result.data.content}}/>
                </div>
            </div>
        </div>
    )
}