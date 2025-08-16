    'use client'

    import {useRef, useState} from "react";

    export default function ImageUploader({setImg}) {
        const fileInputRef = useRef(null);
        const [imageUrl, setImageUrl] = useState("");

        const handleImageChange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                const urlimg = URL.createObjectURL(file);
                setImageUrl(urlimg);
                if (setImg) {
                    setImg(urlimg);
                }
            }
        };

        const handleButtonClick = () => {
            if (fileInputRef.current) {
                fileInputRef.current.click();
            }
        }
        return (
            <div className="flex items-center justify-center w-full p-3">
                {imageUrl ? (
                    <div className="relative">
                        <img src={imageUrl} alt="이미지" className="w-full h-full rounded-xl min-w-30 min-h-30 max-h-60"/>
                        <button className="absolute inset-0 duration-300 hover:opacity-50 opacity-0 bg-gray-100 items-center rounded-xl hover:cursor-pointer" onClick={handleButtonClick}>
                            <p className="">이미지 교체</p>
                        </button>
                    </div>
                ) : (
                    <button className="w-8 h-8 border border-[#cccccc] rounded-full hover:bg-gray-100 hover:cursor-pointer flex items-center justify-center" onClick={handleButtonClick}>
                        <p>+</p>
                    </button>
                )}
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageChange}/>
            </div>
        )

    }