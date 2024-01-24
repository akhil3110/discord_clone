import { useOrigin } from "@/hooks/use-origin";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import {  RedirectToSignIn} from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
    params: {
        inviteCode: string;
    }
};


const InviteCodePage = async ({
    params
}: InviteCodePageProps) => {

    const profile = await currentProfile();

    const origin = typeof window !== "undefined" && window.location.origin  ? window.location.origin : "";

    const s = await db.server.findUnique({
        where:{
            inviteCode: params.inviteCode
        }
    })

    const inviteUrl = `${origin}/invite/${s?.inviteCode}`

    if(!profile){
        return <RedirectToSignIn  redirectUrl={inviteUrl}/>;
    }

    if(!params.inviteCode){
        return redirect("/");
    }

    const existingServer =  await db.server.findFirst({
        where:{
            inviteCode: params.inviteCode,
            members:{
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if(existingServer){
        return redirect(`/servers/${existingServer.id}`)
    }

    const server = await db.server.update({
        where:{
            inviteCode: params.inviteCode
        },
        data:{
            members:{
                create:[
                    {
                        profileId: profile.id
                    }
            ]
            }
        },
    })

    if(server){
        return redirect(`/servers/${server.id}`)
    }

    return null
}
 
export default InviteCodePage;