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
            <div className="flex justify-items-center h-min-30 w-min-30">
                {imageUrl ? (
                    <div>
                        <button
                            className="border border-solid border-blue-400 text-blue-500 inset-0"
                            onClick={handleButtonClick}>
                            이미지 수정
                        </button>
                        <img src={imageUrl} alt="이미지" className="w-full h-full object-cover rounded"/>
                    </div>
                ) : (
                    <button className="border border-solid border-blue-400 text-blue-500" onClick={handleButtonClick}>
                        이미지 업로드
                    </button>
                )}
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageChange}/>
            </div>
        )

    }