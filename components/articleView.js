import formatAuthor from "@/components/formatAuthor";
import {getServerSession} from "next-auth";
import EditDelete from "@/components/EditDelete";

export default async function ArticleView({boardname, article}) {
    const session = await getServerSession()
    if (!session) return null;
    const itsme = (session.user.name === article.data.author)
    return (
        <div>
            {itsme && <EditDelete boardname={boardname} articleData={article.data}/>}
            <div className="flex flex-col divide-y border-y divide-[#cccccc] border-[#cccccc]">
                <p className="text-[18px] py-[6px] px-3 bg-gray-200">{article.data.title}</p>
                <div className="flex flex-row text-[14px] py-[3px] px-3 justify-between">
                    <a className="truncate whitespace-nowrap">{formatAuthor(article.data.author, article.data.hidename, article.data.hideor)}</a>
                    <a className="truncate whitespace-nowrap">조회수 {article.data.views} | 추천 {article.data.gechu} | 작성일 {(new Date(article.data.date)).toLocaleDateString("ko-kr", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hourCycle: "h23"
                    })}</a>
                </div>
                <div className="px-[13px] py-[3px] min-h-[200px] break-words" dangerouslySetInnerHTML={{ __html: article.data.content}}/>
            </div>
        </div>
    )
}