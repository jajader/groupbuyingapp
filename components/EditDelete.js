'use client'
import {PenOff, Trash} from "lucide-react";
import axios from "axios";
import {redirect} from "next/navigation";
import {useState} from "react";

export default function EditDelete({boardname, articleData}) {
    const [open, setOpen] = useState(false)
    return (
        <div className="flex justify-end mx-[6px] mb-[2px] text-[14px]">
            <div className="flex flex-row items-center px-1 gap-1 hover:cursor-pointer hover:bg-blue-100">
                <PenOff strokeWidth={2} size={13}/>
                <p>수정</p>
            </div>
            <p className="px-1">|</p>
            <div className="flex flex-row items-center px-1 gap-1 hover:cursor-pointer hover:bg-red-100"
                 onClick={() => setOpen(true)}>
                <Trash strokeWidth={2} size={13}/>
                <p>삭제</p>
            </div>
            {open && <div className="fixed inset-0 flex justify-center items-center">
                <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm">
                    <h2 className="text-lg font-semibold mb-2">정말 삭제하시겠습니까?</h2>
                    <p className="text-sm text-gray-600 mb-4">이 작업은 되돌릴 수 없습니다.</p>
                    <div className="flex justify-end gap-2">
                        <button onClick={() => async function deleteArticle() {
                            const result = await axios.delete(`/api/${boardname}/${articleData.postId}`)
                            redirect(`/${boardname}`)
                        }} className="px-4 py-2 rounded hover:bg-red-200 hover:cursor-pointer">
                            네
                        </button>
                        <button onClick={() => setOpen(false)} className="px-4 py-2 rounded hover:bg-gray-100 hover:cursor-pointer">
                            아니오
                        </button>
                    </div>
                </div>
            </div>}
        </div>
    )
}