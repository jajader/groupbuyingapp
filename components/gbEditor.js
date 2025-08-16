'use client';
import dynamic from "next/dynamic";
import {useContext, useEffect, useMemo, useState} from "react";
import 'react-quill-new/dist/quill.snow.css';
import axios from "axios";
import {redirect} from "next/navigation";
import {useSession} from "next-auth/react";
import {getServerSession} from "next-auth";
import ImageUploader from "@/components/ImageUploader";


const ReactQuill = dynamic(()=>
        import('react-quill-new'),
    {
        ssr: false,
    })


export default function Editor() {
    const [sort, setSort] = useState('');
    const [content, setContent] = useState('');
    const [link, setLink] = useState('');
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const {data: session, status} = useSession();

    const modules = useMemo(()=> {
        return {
            toolbar: [
                [{size: ['small', false, 'large', 'huge']}],
                ['bold', 'italic', 'underline', 'strike'],
                [{list: 'ordered'}],
                [{align: [] }],
                ['link']
            ],
        }
    })
    if (!session) return null;
    let username = session.user.name;
    const saveButtonClick = async (e) => {
        if (sort === "" || link === "" || price === "" || file === null || name === "") {
            console.log(sort)
            console.log(link)
            console.log(price)
            console.log(file)
            console.log(name)

            alert("종류, 링크, 상품명, 대표 이미지, 가격을 모두 입력하세요")
        } else {

            try {
                const res = await axios.post(`/api/gb`, {content, username, sort, link, name, price})
            } catch (error) {
                console.error(error)
                alert("저장 실패")
            }

            redirect(`/gb`)
        }
    }

    return (
        <div>
            <div className="border divide-y border-[#cccccc] divide-[#cccccc]">
                <div className="flex flex-row divide-x divide-1 divide-[#cccccc]">
                    <label className="w-30 py-2 text-[16px] flex justify-center">종류</label>
                    <input className="px-3 py-2 flex-1" type="text" value={sort} onChange={(e) => setSort(e.target.value)}/>
                </div>
                <div className="flex flex-row divide-x divide-1 divide-[#cccccc]">
                    <label className="w-30 py-2 text-[16px] flex justify-center">링크</label>
                    <input className="px-3 py-2 flex-1" type="text" value={link} onChange={(e) => setLink(e.target.value)}/>
                </div>
                <div className="flex flex-row divide-x divide-1 divide-[#cccccc]">
                    <label className="w-30 py-2 text-[16px] flex justify-center">상품명</label>
                    <input className="px-3 py-2 flex-1" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="flex flex-row divide-x divide-1 divide-[#cccccc]">
                    <label className="w-30 py-2 text-[16px] flex justify-center items-center">대표 이미지</label>
                    <ImageUploader setImg={setImg} setFile={setFile}/>
                </div>
                <div className="flex flex-row divide-x divide-1 divide-[#cccccc]">
                    <label className="w-30 py-2 text-[16px] flex justify-center">가격</label>
                    <div className="flex flex-row items-center">
                        <input className="px-3 py-2 w-30" type="text" value={price} onChange={(e) => setPrice(e.target.value)}/>
                        <p className="px-2 py-2 text-[16px] flex justify-center">원</p>
                    </div>
                </div>
            </div>
            <ReactQuill className="h-90 pb-[42px] pt-[10px]" theme="snow" value={content} onChange={setContent} modules={modules} placeholder="추가적인 내용을 입력하세요"/>
            <button onClick={(e)=> saveButtonClick(e)}
                    className="my-3 border-1 border-[#cccccc] hover:bg-gray-100 float-right hover:cursor-pointer
            flex place-items-center flex-row px-[6px] py-[3px] h-7.5 [500px]:h-15">
                <p className="text-[13px] whitespace-nowrap">작성</p>
            </button>
        </div>
    )
}