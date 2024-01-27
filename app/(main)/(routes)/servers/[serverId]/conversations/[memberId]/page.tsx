const MemberIdPage = ({
    params
}:{
    params: {
        serverId: string;
        memberId: string;
    }
}) => {
    return ( 
        <div>
            <h1>serverId: {params?.serverId}</h1>
            <h1>memberId: {params?.memberId}</h1>
        </div>
     );
}
 
export default MemberIdPage;