"use client"

import qs from "query-string"
import { usePathname, useSearchParams } from "next/navigation"
import ActionTooltip from "../action-tooltip";
import { Video, VideoOff } from "lucide-react";
import { useRouter } from "next/navigation";


const ChatVideoButton = () => {

    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const isVideo = searchParams?.get("video")

    const Icon = isVideo ? VideoOff : Video;
    const tooltipLabel = isVideo ? "End Video Call" : "Start Video Call";

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathName || "",
            query:{
                video: isVideo ? undefined : true,
            }
        },{skipNull: true})

        router.push(url)
    }

    return ( 
        <ActionTooltip side="bottom" label={tooltipLabel}>
            <button onClick={onClick} className=" hover:opacity-75 transition mr-4 ">
                <Icon  className=" h-6 w-6 text-zinc-500 dark:text-zinc-400" />
            </button>
        </ActionTooltip>
     );
}
 
export default ChatVideoButton;