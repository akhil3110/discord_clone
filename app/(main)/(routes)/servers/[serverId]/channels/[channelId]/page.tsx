const ChannelIdPage = ({
    params
}:{
    params: {
        serverId: string;
        channelId: string;
    }
}) => {
    return ( 
        <div>
            <h1>serverId: {params?.serverId}</h1>
            <h1>channelId: {params?.channelId}</h1>
        </div>
     );
}
 
export default ChannelIdPage;