import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { MemberRole, channelType } from "@prisma/client";
import { redirect } from "next/navigation";
import ServerHeader from "./server-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import ServerSearch from "./server-search";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import ServerSection from "./server-section";
import ServerChannel from "./server-channel";
import ServerMember from "./server-member";

interface ServerSidebarProps {
    serverId: string;
}

const iconMap = {
    [channelType.TEXT]: <Hash className="h-4 w-4 mr-2" />,
    [channelType.AUDIO]: <Mic className="h-4 w-4 mr-2" />,
    [channelType.VIDEO]: <Video className="h-4 w-4 mr-2" />
}

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />,
    [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
}

const ServerSidebar = async ({
    serverId
}: ServerSidebarProps) => {

    const profile = await currentProfile();

    if(!profile){
        return redirect("/");
    }

    const server = await db.server.findUnique({
        where:{
            id: serverId,
        },
        include:{
            channels:{
                orderBy: {
                    createdAt: "asc"
                }
            },
            members: {
                include:{
                    profile: true
                },
                orderBy: {
                    role: "asc"
                }
            }
        }
    });

    const textChannels = server?.channels.filter((channel) => channel.type === channelType.TEXT);
    const audioChannels = server?.channels.filter((channel) => channel.type === channelType.AUDIO);
    const videoChannels = server?.channels.filter((channel) => channel.type === channelType.VIDEO);

    const members = server?.members.filter((member) => member.profileId !== profile.id);

    if(!server){
        return redirect("/");
    }

    const role = server.members.find((member) => member.profileId === profile.id)?.role;



    return ( 
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]]">
            <ServerHeader
                server={server}
                role={role}
            />
            <ScrollArea className="flex-1 px-3">
                <div className=" mt-2">
                    <ServerSearch 
                        data={[
                            {
                                label:"Text Channels",
                                type: "channel",
                                data: textChannels?.map((channel) => ({
                                    icon: iconMap[channel.type],
                                    name: channel.name,
                                    id: channel.id
                                }))
                            },
                            {
                                label:"Voice Channels",
                                type: "channel",
                                data: audioChannels?.map((channel) => ({
                                    icon: iconMap[channel.type],
                                    name: channel.name,
                                    id: channel.id
                                }))
                            },
                            {
                                label:"Video Channels",
                                type: "channel",
                                data: videoChannels?.map((channel) => ({
                                    icon: iconMap[channel.type],
                                    name: channel.name,
                                    id: channel.id
                                }))
                            },
                            {
                                label: "Members",
                                type: "member",
                                data: members?.map((member) => ({
                                    icon: roleIconMap[member.role],
                                    name: member.profile.name,
                                    id: member.profile.id
                                }))
                            }
                        ]}
                    />
                </div>
                <Separator className= " bg-zinc-200 dark:bg-zinc-700 round  my-2" />
                {!!textChannels?.length && (
                    <div className="mb-2" >
                        <ServerSection 
                            sectionType="channels"
                            channelType= {channelType.TEXT}
                            role={role}
                            label="Text Channels"
                        />
                        <div className="space-y-[2px]">
                            {textChannels.map((channel) => (
                                <ServerChannel 
                                key={channel.id}
                                channel={channel}
                                server={server}
                                role={role}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {!!audioChannels?.length && (
                    <div className="mb-2" >
                        <ServerSection 
                            sectionType="channels"
                            channelType= {channelType.AUDIO}
                            role={role}
                            label="Voice Channels"
                        />
                        <div className="space-y-[2px]">
                            {audioChannels.map((channel) => (
                                <ServerChannel 
                                    key={channel.id}
                                    channel={channel}
                                    server={server}
                                    role={role}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {!!videoChannels?.length && (
                    <div className="mb-2" >
                        <ServerSection 
                            sectionType="channels"
                            channelType= {channelType.VIDEO}
                            role={role}
                            label="Video Channels"
                        />
                        <div className="space-y-[2px]">
                            {videoChannels.map((channel) => (
                                <ServerChannel 
                                    key={channel.id}
                                    channel={channel}
                                    server={server}
                                    role={role}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {!!members?.length && (
                    <div className="mb-2" >
                        <ServerSection 
                            sectionType="members"
                            role={role}
                            label="Members"
                            server={server}
                        />
                       {members.map((member) => (
                        <ServerMember 
                            key={member.profile.id}
                            member={member}
                            server={server}
                        />
                       ))}
                    </div>
                )}
                
            </ScrollArea>
        </div>
     );
}
 
export default ServerSidebar;