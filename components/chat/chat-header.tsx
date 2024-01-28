import { Hash, Menu } from "lucide-react";
import ModdleToggle from "@/components/mobile-toggle";
  


interface ChatHeaderProps {
    serverId: string;
    name: string;
    type: "channel" | "conversation";
    imageUrl?: string; 
}

const ChatHeader = ({
    serverId,
    name,
    type,
    imageUrl
}: ChatHeaderProps) => {
    return ( 
        <div
            className=" font-semibold flex px-3 items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2"
        >
            <ModdleToggle 
                serverId={serverId}
            />
            {type === "channel" && (
                <Hash className="mr-2 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            )}
            <p className=" font-semibold text-black dark:text-white ">
                {name}
            </p>
        </div>
     );
}
 
export default ChatHeader;