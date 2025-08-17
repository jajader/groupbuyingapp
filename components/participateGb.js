'use client'
import axios from "axios";
import {useState} from "react";

axios.defaults.url = process.env.DEFAULT_URL;
export default function ParticipateGb({id, participants, user}) {
    const [thereisme, setThereisme] = useState(participants.some(participant => participant === user));
    const [participating, setParticipating] = useState(false);
    const Participate = async () => {
        if (participating) {
            return null;
        }

        if (!thereisme) {
            try {
                setParticipating(true);
                const result = await axios.post(`/api/gb/${id}`, {
                    action: "participate",
                    user: user
                })
                setThereisme(true);
                setParticipating(false);
            } catch (error) {
                console.error(error)
                alert("오류 발생")
            }
        } else {
            try {
                setParticipating(true);
                const result = await axios.post(`/api/gb/${id}`, {
                    action: "exit",
                    user: user
                })
                setThereisme(false);
                setParticipating(false);
            } catch (error) {
                console.error(error)
                alert("오류 발생")
            }
        }
    }
    return (
        <div>
            {thereisme ?
                <div className="relative ml-2 my-2 inline-block">
                    <p className="text-[14px] break-all border-1 px-1 py-1 rounded-xl border-[#cccccc]">{user}</p>
                    <button className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/2 text-red-500
                    bg-white rounded-full border-1 text-[10px] w-4 border-[#cccccc] font-bold hover:cursor-pointer hover:bg-gray-200"
                    onClick={Participate}>
                        ×
                    </button>
                </div>
                :
                <div className="relative ml-2 my-2 inline-block">
                    <button className="text-[14px] break-all border-1 px-1 py-1 rounded-xl border-[#cccccc] hover:cursor-pointer hover:bg-gray-200 font-[1000]" onClick={Participate}>참여</button>
                </div>
            }
        </div>
    )

}
