import { Member, Profile, Server } from "@prisma/client";
import { Server as NetServer, Socket} from "net";
import { NextApiRequest  } from "next";
import {Server as ServerIo} from "socket.io";


export type NextApiResponseServerIo = NextApiRequest & {
    socket: Socket & {
        server: NetServer & {
            io: ServerIo
        }
    }
}

export type ServerWithMembersWithProfiles = Server & {
    members: (Member & {
        profile: Profile
    })[]
}

