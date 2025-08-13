import {Pencil} from "lucide-react";
import Editor from "@/components/Editor";
import Link from "next/link"
import axios from "axios";
import {redirect} from "next/navigation";
import formatAuthor from "@/components/formatAuthor";
import ArticlesTable from "@/components/articlesTable";
export const dynamic = 'force-dynamic';

axios.defaults.baseURL = "http://sagb.kro.kr:3000"
export default async function freeboard() {
    const result = await axios.get('/api/freeboard')
    const articles = result.data.reverse()

    return (
        <ArticlesTable articles={articles} boardname="freeboard"/>
    )
}