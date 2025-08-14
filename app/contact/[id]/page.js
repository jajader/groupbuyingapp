import axios from "axios";
import ArticleView from "@/components/articleView";
import {redirect} from "next/navigation";

axios.defaults.baseURL = process.env.DEFAULT_URL
export default async function article({params}) {
    const {id} = await params;
    const result = await axios.get(`/api/contact/${id}`)
    if (!result.data) {
        redirect(`${process.env.DEFAULT_URL}/error`)
    }
    return (
        <ArticleView boardname="contact" article={result}/>
    )
}