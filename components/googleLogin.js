'use client'
import {signIn} from "next-auth/react";

export default function LoginButton() {
    return(
        <div>

            <button onClick={() => signIn("google")}
                    className="flex items-center bg-white transition-colors hover:cursor-pointer duration-300 h-10
                    text-gray-800 md:pr-6 md:pl-4 px-2 py-2 rounded hover:bg-blue-100 border-1">
                <img
                    src="/web_light_sq_na.svg"
                    alt="Google logo"
                    className="h-7"
                />
                <p className="text-[14px] font-[font-weight] hidden md:block">Google 계정으로 계속하기</p>
            </button>
        </div>
    )
}