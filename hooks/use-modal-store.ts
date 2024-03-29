import { Channel, Server, channelType } from '@prisma/client';
import {create} from  'zustand';

export type ModalType = "createServer" | "invite" | "edit-server" | "members" | "createChannel" | "leaveServer" | "deleteServer" | "deleteChannel" | "editChannel" | "messageFile" | "deleteMessage";

interface ModalData {
    server?: Server;
    ChannelType?: channelType;
    channel?: Channel;
    apiUrl?: string;
    query?: Record<string, string>;
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({type, isOpen: true, data}),
    onClose: () => set({type: null, isOpen: false})
}));

