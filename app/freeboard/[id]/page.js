import axios from "axios";
import formatAuthor from "@/components/formatAuthor";
import ArticleView from "@/components/articleView";
import {redirect} from "next/navigation";

axios.defaults.baseURL = "http://sagb.kro.kr:3000"
export default async function article({params}) {
    const {id} = await params;
    const result = await axios.get(`/api/freeboard/${id}`)
    if (!result.data) {
        redirect("http://sagb.kro.kr:3000/error")
    }
    return (
        <ArticleView article={result}/>
    )
}