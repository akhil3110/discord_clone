import { set } from "date-fns";
import { useEffect, useState } from "react";

type ChatScrollProps = {
    chatRef: React.RefObject<HTMLDivElement>;
    bottomRef: React.RefObject<HTMLDivElement>;
    shouldLoadMore: boolean;
    loadMore: () => void;
    count: number;
}

export const useChatScroll = ({ 
    chatRef, 
    bottomRef, 
    shouldLoadMore, 
    loadMore, 
    count 
}: ChatScrollProps) => {

        const [hasInitialized, setHasInitialized] = useState(false);

        useEffect(() => {
            const topDiv = chatRef?.current;

            const handleScroll = () => {
                const scrollTop = topDiv?.scrollTop;

                if(scrollTop === 0 && shouldLoadMore) {
                    loadMore();
                }
            };

            topDiv?.addEventListener('scroll', handleScroll);

            return () => {
                topDiv?.removeEventListener('scroll', handleScroll);
            }
        },[shouldLoadMore, loadMore, chatRef])

         useEffect(() => {
            const bottomDiv = bottomRef?.current;
            const topDiv = chatRef?.current;
            const sholdAutoScroll = () =>{
                if(!hasInitialized && bottomDiv){
                    setHasInitialized(true);
                    return true;
                }

                if(!topDiv){
                    return false;
                }

                const distanceFromMottom = topDiv.scrollHeight - topDiv.clientHeight - topDiv.scrollTop; 

                return distanceFromMottom <=100
            }

            if(sholdAutoScroll()){
                setTimeout(() => {
                    bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
         },[ count, bottomRef, chatRef, hasInitialized])
}