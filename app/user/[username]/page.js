import {Avatar, AvatarImage} from "@/components/ui/avatar";

export default function user() {
    return (
        <div>
            <div className="h-[200px] bg-amber-300 flex p-3">
                <Avatar className="w-25 h-25">
                    <AvatarImage src="/uploads/1756614282633-KakaoTalk_20230515_205755849.jpg" alt="이미지"/>
                </Avatar>
            </div>
        </div>
    )
}