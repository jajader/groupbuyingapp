    'use client'

    import {useRef, useState} from "react";

    export default function ImageUploader() {
        const fileInputRef = useRef(null);
        const [imageUrl, setImageUrl] = useState("");

        const handleImageChange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                setImageUrl(URL.createObjectURL(file));
            }
        };

        const handleButtonClick = () => {
            if (fileInputRef.current) {
                fileInputRef.current.click();
            }
        }
        console.log(imageUrl)
        return (
            <div className="flex justify-items-center">
                {imageUrl ? (
                    <div className="relative">
                        <img src={imageUrl} alt="이미지" className="w-full h-full rounded-xl min-w-30 min-h-30 max-h-90"/>
                        <button className="absolute inset-0 duration-300 hover:opacity-50 opacity-0 bg-gray-100 items-center rounded-xl hover:cursor-pointer" onClick={handleButtonClick}>
                            <p className="">이미지 교체</p>
                        </button>
                    </div>
                ) : (
                    <button className="p-4 border border-[#cccccc] rounded hover:bg-gray-100 hover:cursor-pointer" onClick={handleButtonClick}>
                        이미지 업로드
                    </button>
                )}
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageChange}/>
            </div>
        )

    }