'use client';
import dynamic from "next/dynamic";
import {useEffect, useMemo, useState} from "react";
import 'react-quill-new/dist/quill.snow.css';
import axios from "axios";
import {redirect} from "next/navigation";
import {useSession} from "next-auth/react";

const ReactQuill = dynamic(()=>
        import('react-quill-new'),
    {
        ssr: false,
    })


export default function Editor() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const {data: session, status} = useSession();

    const modules = useMemo(()=> {
        return {
            toolbar: [
                [{size: ['small', false, 'large', 'huge']}],
                ['bold', 'italic', 'underline', 'strike'],
                [{list: 'ordered'}, {list: 'bullet'}],
                [{align: [] }],
                ['link'],
                ['clean']
            ],
        }
    })

    if (!session) return null;
    let username = session.user.name;
    if (session.user.name === "11기 우보현") {
        username = session.user.name + "⭐";
    }
    const saveButtonClick = async (e) => {
        if (title==="" || content==="") {
            alert("제목과 내용을 입력하세요")
        } else {
            try {
                const res = await axios.post('/api/freeboard', {title, content, username})
            } catch (error) {
                console.error(error)
                alert("저장 실패")
            }

            redirect("/freeboard")
        }
    }

    return (
        <div>
            <input className="mb-3 w-full py-2 px-3 border-1 rounded-[5px] border-[#cccccc]"
                   placeholder="제목을 입력하세요" value={title} onChange={(e)=> setTitle(e.target.value)}></input>
            <ReactQuill className="h-120 pb-[42px]" theme="snow" value={content} onChange={setContent} modules={modules} placeholder="내용을 입력하세요"/>
            <button onClick={(e)=> saveButtonClick(e)}
            className="my-3 border-1 border-[#cccccc] hover:bg-gray-100 float-right hover:cursor-pointer
            flex place-items-center flex-row px-[6px] py-[3px] h-7.5">
                <p className="text-[13px] whitespace-nowrap">작성</p>
            </button>
        </div>
    )
}