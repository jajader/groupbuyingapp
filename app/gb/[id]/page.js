import axios from "axios";

axios.defaults.baseURL = "http://sagb.kro.kr:3000"
export default async function article({params}) {
    const {id} = await params;
    const result = await axios.get(`/api/gb/${id}`)
    return (
        <div className="flex flex-col divide-y border-y divide-[#cccccc] border-[#cccccc]">
            <p className="text-[18px] py-[6px] px-3 bg-gray-200">{result.data.title}</p>
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
            <div className="px-[13px] py-[3px] min-h-[200px] break-words" dangerouslySetInnerHTML={{ __html: result.data.content}}/>
        </div>
    )
}